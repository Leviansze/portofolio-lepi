"use client";

import { useState, useEffect, useRef } from "react";
import { Profile } from "@/components/Pages/Profile";
import { Projects } from "@/components/Pages/Projects";
import { Certificates } from "@/components/Pages/Certificates";
import { ContactAndSocialMedia } from "@/components/Pages/ContactAndSocialMedia";
import { FaSkull, FaExclamationTriangle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const scaryMessages = [
  "SYSTEM_HALTED", "DONT_LOOK_BEHIND_YOU", "0xDEADBEEF", "FATAL_EXCEPTION", 
  "THEY_ARE_WATCHING", "MEMORY_LEAK", "YOUR_DATA_IS_GONE", "NULL_POINTER", 
  "RUN_WHILE_YOU_CAN", "SEGMENTATION_FAULT", "I_SEE_YOU"
];

export default function Home() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "Profile";
  const [showWarning, setShowWarning] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let textInterval: NodeJS.Timeout | undefined;
    let animationFrameId: number;

    if (chaosMode) {
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
      intervalId = setInterval(() => {
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

    } else {
      document.body.style.transform = "none";
      document.body.style.overflow = "auto";
      document.documentElement.style.filter = "none";
      
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioCtxRef.current) audioCtxRef.current.close();
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(textInterval);
      cancelAnimationFrame(animationFrameId);
      document.body.style.transform = "none";
      document.body.style.overflow = "auto";
      document.documentElement.style.filter = "none";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (oscillatorRef.current) try { oscillatorRef.current.stop(); } catch(_e){}
    };
  }, [chaosMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white font-mono transition-colors duration-300">
      
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {chaosMode && (
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
              onClick={() => setChaosMode(false)}
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
      )}

      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-300">
           <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_20px,#111_20px,#111_40px)] opacity-50 -z-10"></div>
           
           <div className="bg-yellow-400 dark:bg-yellow-600 border-8 border-black dark:border-white p-8 md:p-12 max-w-xl w-full shadow-[20px_20px_0_0_#fff] dark:shadow-[20px_20px_0_0_#000] relative transform -rotate-2">
            
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-6 py-2 font-mono font-bold border-2 border-white dark:border-black uppercase tracking-widest shadow-[4px_4px_0_0_#ff0000]">
               <FaExclamationTriangle className="inline-block mr-2 mb-1" /> Security Alert
            </div>

            <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 text-black dark:text-white text-center leading-[0.9] tracking-tighter">
              DO NOT<br/><span className="text-red-600 dark:text-red-400">PROCEED</span>
            </h2>
            
            <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 mb-8 font-mono font-bold text-lg text-black dark:text-white shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]">
              <p className="mb-4">You are about to execute a dangerous function.</p>
              <ul className="list-disc pl-5 space-y-1 text-red-600 dark:text-red-400 uppercase">
                <li>System instability risk</li>
                <li>Visual & Audio Hazard</li>
                <li>No turning back</li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setShowWarning(false);
                  setChaosMode(true);
                }}
                className="w-full bg-black dark:bg-zinc-900 border-4 border-black dark:border-white text-red-500 font-black text-2xl py-5 uppercase shadow-[8px_8px_0_0_#ff0000] hover:bg-red-600 hover:text-black dark:hover:text-white hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <FaSkull /> I ACCEPT THE RISK
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="w-full bg-white dark:bg-zinc-200 border-4 border-black dark:border-white text-black font-black text-xl py-4 uppercase shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] hover:bg-gray-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all cursor-pointer"
              >
                Cancel (Safe Mode)
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="relative z-10 px-4 py-6 md:px-8 mx-auto">
        <ul className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0 border-4 border-black dark:border-white p-4 lg:p-6 shadow-[6px_6px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] bg-white dark:bg-zinc-900 transition-all">
          
          <span className="flex flex-col md:flex-row gap-4 lg:space-x-4 text-center w-full lg:w-auto">
            {[
              { id: "Profile", label: "Profile", color: "bg-blue-500 dark:bg-blue-800", icon: "★" },
              { id: "Projects", label: "Projects", color: "bg-yellow-300 dark:bg-yellow-600", icon: "✦" },
              { id: "Certificates", label: "Certificates", color: "bg-green-500 dark:bg-green-700", icon: "☀" },
              { id: "ContactAndSocialMedia", label: "Contact", color: "bg-pink-400 dark:bg-pink-700", icon: "☎" },
            ].map((item) => (
              <li key={item.id} className="w-full md:w-auto">
                <Link
                  href={item.id === "Profile" ? "/" : `/?tab=${item.id}`}
                  scroll={false}
                  className={`
                    ${item.color} 
                    block border-2 border-black dark:border-white px-6 py-3 font-black text-black dark:text-white text-lg uppercase tracking-tight
                    shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] transition-all cursor-pointer
                    flex items-center justify-center rounded-md gap-2
                    ${currentTab === item.id 
                      ? "translate-x-[2px] translate-y-[2px] shadow-none ring-2 ring-black dark:ring-white brightness-110" 
                      : "hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]"
                    }
                  `} 
                >
                  {currentTab === item.id && (
                    <span className="text-xl animate-[spin_3s_linear_infinite] inline-block font-bold">
                      {item.icon}
                    </span>
                  )}
                  
                  {item.label}
                  
                  {currentTab === item.id && (
                    <span className="text-xl animate-[spin_3s_linear_infinite_reverse] inline-block font-bold">
                      {item.icon}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </span>

          <li className="w-full lg:w-auto text-center mt-4 lg:mt-0">
            <button
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 border-2 border-black dark:border-white bg-red-600 px-6 py-3 font-black uppercase text-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] hover:bg-red-700 hover:rotate-2 hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse tracking-widest rounded-md"
              onClick={() => setShowWarning(true)}
            >
              <FaSkull /> Don&apos;t Click Me
            </button>
          </li>
        </ul>
      </nav>

      <main className="px-4 py-2 md:px-8 md:py-4">
        {currentTab === "Profile" && <Profile />}
        {currentTab === "Projects" && <Projects />}
        {currentTab === "Certificates" && <Certificates />}
        {currentTab === "ContactAndSocialMedia" && <ContactAndSocialMedia />}
      </main>
    </div>
  );
}