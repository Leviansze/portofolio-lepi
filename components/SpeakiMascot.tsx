"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

export default function SpeakiMascot() {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const normalImage = "/speaki.png";
  const talkImage = "/speaki-cry.png";
  const sounds = [
    "/sounds/a.mp3",
    "/sounds/aau.mp3",
    "/sounds/chuayo.mp3",
    "/sounds/deruzibazeyo.mp3",
    "/sounds/deruzibazeyoonly.mp3",
    "/sounds/fullbazeyo.mp3",
    "/sounds/morijabadangizibazeyo.mp3",
    "/sounds/murugorureziru.mp3",
    "/sounds/speaki.mp3",
    "/sounds/uaa.mp3",
    "/sounds/squash.mp3",
    "/sounds/sunbakochi.mp3",
  ];

  const playRandomSound = () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.volume = 0.6;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const moveRandomly = useCallback(() => {
    const padding = 100;
    const maxWidth = window.innerWidth - padding;
    const maxHeight = window.innerHeight - padding;

    const newLeft = Math.floor(Math.random() * (maxWidth - padding)) + padding / 2;
    const newTop = Math.floor(Math.random() * (maxHeight - padding)) + padding / 2;

    setPosition((prev) => {
      if (prev && newLeft < prev.left) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
      return { top: newTop, left: newLeft };
    });
  }, []);

  const handleInteraction = () => {
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    
    setIsInteracting(true);
    playRandomSound();

    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  useEffect(() => {
    if (isInteracting) return;

    const startMoveTimer = setTimeout(() => {
      moveRandomly();
    }, 50);

    const interval = setInterval(moveRandomly, 3500);

    return () => {
      clearTimeout(startMoveTimer);
      clearInterval(interval);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, [isInteracting, moveRandomly]);

  if (!position) return null;

  return (
    <div
      onClick={handleInteraction}
      className={`fixed z-50 cursor-pointer ${
        isInteracting ? "" : "transition-all duration-[3000ms] ease-in-out"
      }`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: `${isFlipped ? "scaleX(-1)" : "scaleX(1)"} scale(1.1)`,
      }}
    >
      <Image
        src={isInteracting ? talkImage : normalImage}
        alt="Speaki Mascot"
        width={90}
        height={90}
        className={`select-none pointer-events-none ${
          isInteracting ? "" : "animate-bounce-walk"
        }`}
      />
    </div>
  );
}