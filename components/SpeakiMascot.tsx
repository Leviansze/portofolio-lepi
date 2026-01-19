"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

export default function SpeakiMascot() {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const normalImage = "/speaki.png";
  const talkImage = "/speaki-cry.png";
  const dragImage = "/speaki-drag.png";
  const dropImage = "/speaki-drop.png";

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
    if (sounds.length === 0) return;
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isInteracting || isDropping) return;
    setIsDragging(true);
    if (position) {
        dragOffset.current = {
            x: e.clientX - position.left,
            y: e.clientY - position.top
        };
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const newLeft = e.clientX - dragOffset.current.x;
    const newTop = e.clientY - dragOffset.current.y;
    setPosition({ top: newTop, left: newLeft });
    if (position && newLeft < position.left) setIsFlipped(true);
    else if (position && newLeft > position.left) setIsFlipped(false);
  }, [isDragging, position]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    setIsDropping(true);
    playRandomSound();

    if (dropTimeoutRef.current) clearTimeout(dropTimeoutRef.current);
    dropTimeoutRef.current = setTimeout(() => {
        setIsDropping(false);
        moveRandomly();
    }, 1000);

  }, [isDragging, playRandomSound]);


  const handleClick = () => {
    if (isDragging || isDropping) return;

    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    
    setIsInteracting(true);
    playRandomSound();

    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 500);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);


  useEffect(() => {
    if (isInteracting || isDragging || isDropping) return;
    const startMoveTimer = setTimeout(() => {
      moveRandomly();
    }, 100);

    const interval = setInterval(moveRandomly, 3500);

    return () => {
      clearTimeout(startMoveTimer);
      clearInterval(interval);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (dropTimeoutRef.current) clearTimeout(dropTimeoutRef.current);
    };
  }, [isInteracting, isDragging, isDropping, moveRandomly]);

  if (!position) return null;
  let currentImage = normalImage;
  if (isDragging) currentImage = dragImage;
  else if (isDropping) currentImage = dropImage;
  else if (isInteracting) currentImage = talkImage;


  let transitionClass = "transition-all duration-[3000ms] ease-in-out";
  if (isDragging) {
    transitionClass = "transition-none duration-0";
  } else if (isInteracting || isDropping) {
    transitionClass = "transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)";
  }

  const baseScale = 1.1;
  let transformStyle = isFlipped ? `scaleX(-1) scale(${baseScale})` : `scaleX(1) scale(${baseScale})`;
  
  if (isInteracting) {
    transformStyle = isFlipped 
      ? `scaleX(-1.2) scaleY(0.8)`
      : `scaleX(1.2) scaleY(0.8)`;
  }


  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className={`fixed z-50 cursor-grab active:cursor-grabbing ${transitionClass}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transformOrigin: "bottom center", 
        transform: transformStyle,
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none"
      }}
    >
      <Image
        src={currentImage}
        alt="Speaki Mascot"
        width={90}
        height={90}
        className={`pointer-events-none select-none ${
            (isInteracting || isDragging || isDropping) ? "" : "animate-bounce-walk"
        }`}
        draggable={false}
      />
    </div>
  );
}