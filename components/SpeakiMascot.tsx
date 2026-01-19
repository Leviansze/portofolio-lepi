"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function SpeakiMascot() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const sounds = [
    "/sounds/a.mp3",
    "/sounds/aau.mp3",
    "/sounds/chuayo.mp3",
    "/sounds/deruzibazeyo.mp3",
    "/sounds/deruzibazeyoonly.mp3",
    "/sounds/fullazeyo.mp3",
  ];

  const playRandomSound = () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const moveRandomly = useCallback(() => {
    if (typeof window === "undefined") return;

    const maxWidth = window.innerWidth - 100;
    const maxHeight = window.innerHeight - 100;

    const newLeft = Math.floor(Math.random() * maxWidth);
    const newTop = Math.floor(Math.random() * maxHeight);

    if (newLeft < position.left) {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }

    setPosition({ top: newTop, left: newLeft });
  }, [position.left]);

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    moveRandomly();

    const interval = setInterval(() => {
      moveRandomly();
    }, 4000); 

    return () => clearInterval(interval);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [moveRandomly]);

  if (!isClient) return null;

  return (
    <div
      onClick={playRandomSound}
      className="fixed z-50 cursor-pointer transition-all duration-[3000ms] ease-in-out hover:scale-110"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: isFlipped ? "scaleX(-1)" : "scaleX(1)",
      }}
    >
      <Image 
        src="/speaki.gif" 
        alt="Speaki Mascot" 
        width={80} 
        height={80} 
        className="select-none pointer-events-none"
        priority
      />
    </div>
  );
}