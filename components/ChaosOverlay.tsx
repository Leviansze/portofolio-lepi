"use client";

import React, { useEffect, useRef } from "react";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const scaryMessages = [
  "SYSTEM_HALTED", "DONT_LOOK_BEHIND_YOU", "0xDEADBEEF", "FATAL_EXCEPTION", 
  "THEY_ARE_WATCHING", "MEMORY_LEAK", "YOUR_DATA_IS_GONE", "NULL_POINTER", 
  "RUN_WHILE_YOU_CAN", "SEGMENTATION_FAULT", "I_SEE_YOU"
];

interface ChaosOverlayProps {
  onClose: () => void;
}

export default function ChaosOverlay({ onClose }: ChaosOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const initAudio = () => {
      try {
        const AudioContextClass = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext: new () => AudioContext }).webkitAudioContext;
        
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.value = 100;
          gain.gain.value = 0.1; 
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          oscillatorRef.current = osc;
          gainNodeRef.current = gain;
        }
      } catch (e) {
        console.warn("Audio API blocked or not supported:", e);
      }
    };

    initAudio();

    document.body.style.overflow = "hidden";

    const intervalId = setInterval(() => {
      const x = randomInt(-10, 10);
      const y = randomInt(-10, 10);
      const rotate = randomInt(-2, 2);
      const invert = Math.random() > 0.9 ? 1 : 0;
      
      document.body.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
      document.documentElement.style.filter = `invert(${invert}) contrast(150%)`;
      
      if (oscillatorRef.current && audioCtxRef.current) {
         oscillatorRef.current.frequency.setValueAtTime(
            randomInt(50, 600), 
            audioCtxRef.current.currentTime
         );
      }
    }, 50);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resizeCanvas = () => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
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
                buffer32[i] = 0x00ffffff;
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
      document.body.style.transform = "";
      document.body.style.overflow = "";
      document.documentElement.style.filter = "";
      
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch(e) { console.log(e) }
        oscillatorRef.current.disconnect();
      }
      
      if (audioCtxRef.current) {
        if (audioCtxRef.current.state !== 'closed') {
             audioCtxRef.current.close();
        }
      }

      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black cursor-none flex items-center justify-center overflow-hidden font-mono">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none mix-blend-overlay" 
      />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#ff0000_100%)] mix-blend-multiply opacity-80 pointer-events-none animate-pulse"></div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="absolute text-red-600 font-bold text-2xl md:text-4xl opacity-60 animate-ping"
              style={{
                top: `${randomInt(5, 95)}%`,
                left: `${randomInt(5, 95)}%`,
                animationDuration: `${randomInt(500, 2000)}ms`,
                transform: `scale(${randomInt(1, 3)})`
              }}
            >
              {scaryMessages[randomInt(0, scaryMessages.length - 1)]}
            </div>
          ))}
      </div>

      <div className="relative z-50 flex flex-col items-center gap-8 text-center">
        <h1 className="text-6xl md:text-9xl font-black text-red-600 tracking-tighter uppercase glitch-text" data-text="FATAL_ERROR">
          FATAL_ERROR
        </h1>
        
        <div className="bg-black border-4 border-red-600 p-6 shadow-[10px_10px_0_0_#ff0000] max-w-xl animate-bounce mx-4">
          <p className="text-lg md:text-2xl text-red-500 font-bold mb-4 leading-relaxed">
              &gt; SYSTEM INTEGRITY COMPROMISED <br/>
              &gt; UNAUTHORIZED ACCESS DETECTED <br/>
              &gt; INITIATING PURGE SEQUENCE...
          </p>
          <div className="w-full bg-red-900 h-4 border border-red-500 overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-red-500 w-[80%] animate-pulse"></div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 group relative inline-block focus:outline-none"
        >
          <span className="relative z-10 block px-8 py-4 md:px-12 bg-white border-4 border-red-600 text-red-600 font-black text-xl md:text-3xl uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors duration-75">
            FORCE REBOOT
          </span>
          <span className="absolute top-0 left-0 w-full h-full bg-red-600 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
        </button>
      </div>

      <style jsx>{`
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