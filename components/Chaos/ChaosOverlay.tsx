"use client";

import { useEffect, useRef } from "react";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const scaryMessages = [
  "SYSTEM_HALTED", "DONT_LOOK_BEHIND_YOU", "0xDEADBEEF", "FATAL_EXCEPTION", 
  "THEY_ARE_WATCHING", "MEMORY_LEAK", "YOUR_DATA_IS_GONE", "NULL_POINTER", 
  "RUN_WHILE_YOU_CAN", "SEGMENTATION_FAULT", "I_SEE_YOU"
];

interface ChaosOverlayProps {
  onReboot: () => void;
}

function ChaosOverlay({ onReboot }: ChaosOverlayProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    try {
      const AudioContext = window.AudioContext || (window.AudioContext);
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        
        osc.type = "sawtooth";
        osc.frequency.value = 100;
        
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        
        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
      }
    } catch (e) {
      console.error("Audio API blocked", e);
    }

    document.body.style.overflow = "hidden";

    const intervalId = setInterval(() => {
      const x = randomInt(-20, 20);
      const y = randomInt(-20, 20);
      const rotate = randomInt(-5, 5);
      const invert = Math.random() > 0.8 ? 1 : 0;
      const blur = Math.random() > 0.9 ? "blur(4px)" : "none";
      
      document.body.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
      document.documentElement.style.filter = `invert(${invert}) ${blur} contrast(200%)`;
      
      if (oscillatorRef.current && audioCtxRef.current) {
          oscillatorRef.current.frequency.setValueAtTime(randomInt(50, 800), audioCtxRef.current.currentTime);
      }

    }, 50);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const drawNoise = () => {
          if (!ctx) return;
          const w = canvas.width;
          const h = canvas.height;
          const idata = ctx.createImageData(w, h);
          const buffer32 = new Uint32Array(idata.data.buffer);
          const len = buffer32.length;
          
          for (let i = 0; i < len; i++) {
              if (Math.random() < 0.5) {
                  buffer32[i] = 0xff000000;
              } else {
                  buffer32[i] = 0xffffffff;
              }
          }
          ctx.putImageData(idata, 0, 0);
          animationFrameId = requestAnimationFrame(drawNoise);
      };
      drawNoise();
    }

    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
      document.body.style.transform = "none";
      document.body.style.overflow = "auto";
      document.documentElement.style.filter = "none";
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (oscillatorRef.current) try { oscillatorRef.current.stop(); } catch(_e){}
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black cursor-none flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-overlay" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#ff0000_100%)] mix-blend-multiply opacity-80 pointer-events-none animate-pulse"></div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              className="absolute text-red-600 font-mono font-bold text-4xl opacity-70 animate-ping"
              style={{
                top: `${randomInt(0, 100)}%`,
                left: `${randomInt(0, 100)}%`,
                animationDuration: `${randomInt(100, 2000)}ms`,
                transform: `scale(${randomInt(1, 4)})`
              }}
            >
              {scaryMessages[randomInt(0, scaryMessages.length - 1)]}
            </div>
          ))}
      </div>

      <div className="relative z-50 flex flex-col items-center gap-8 text-center mix-blend-hard-light">
        <h1 className="text-7xl md:text-9xl font-black text-red-600 tracking-tighter uppercase glitch-text" data-text="FATAL_ERROR">
          FATAL_ERROR
        </h1>
        
        <div className="bg-black border-4 border-red-600 p-6 shadow-[10px_10px_0_0_#ff0000] max-w-2xl animate-bounce">
          <p className="font-mono text-xl md:text-2xl text-red-500 font-bold mb-4">
              &gt; SYSTEM INTEGRITY COMPROMISED <br/>
              &gt; UNAUTHORIZED ACCESS DETECTED <br/>
              &gt; INITIATING PURGE SEQUENCE...
          </p>
          <div className="w-full bg-red-900 h-4 border border-red-500 overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-red-500 w-[80%] animate-pulse"></div>
          </div>
        </div>

        <button 
          onClick={onReboot}
          className="mt-12 group relative inline-block focus:outline-none"
        >
          <span className="relative z-10 block px-12 py-4 bg-white border-4 border-red-600 text-red-600 font-black text-3xl uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors duration-75">
            FORCE REBOOT
          </span>
          <span className="absolute top-0 left-0 w-full h-full bg-red-600 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
          <span className="absolute top-0 left-0 w-full h-full bg-cyan-400 opacity-50 animate-ping" style={{animationDuration: '0.2s'}}></span>
        </button>
      </div>

      <style jsx global>{`
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); }
          20% { clip-path: inset(60% 0 10% 0); }
          40% { clip-path: inset(40% 0 50% 0); }
          60% { clip-path: inset(80% 0 5% 0); }
          80% { clip-path: inset(10% 0 60% 0); }
          100% { clip-path: inset(30% 0 30% 0); }
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #00ffff;
          clip-path: inset(0 0 0 0);
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #ff00ff;
          clip-path: inset(0 0 0 0);
          animation: glitch-anim-1 3s infinite linear alternate-reverse;
        }
      `}</style>
    </div>
  );
}

export default ChaosOverlay;