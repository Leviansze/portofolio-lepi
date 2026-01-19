"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

export default function SpeakiMascot() {
  // --- State ---
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Status Interaksi
  const [isInteracting, setIsInteracting] = useState(false); // Klik/Ngomong
  const [isDragging, setIsDragging] = useState(false);       // Sedang dipegang mouse
  const [isFalling, setIsFalling] = useState(false);         // Sedang meluncur ke bawah (jatuh)
  const [isDropping, setIsDropping] = useState(false);       // Sudah mendarat (pose impact)

  // --- Refs ---
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);
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
    "/sounds/deruzibazeyoonly.mp3",
    "/sounds/speaki.mp3",
    "/sounds/uaa.mp3",
    "/sounds/squash.mp3",
  ];

  const playRandomSound = () => {
    if (sounds.length === 0) return;
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.volume = 0.6;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const getFloorLevel = () => {
    if (typeof window === "undefined") return 0;
    return window.innerHeight - 130;
  };

  const moveBottomOnly = useCallback(() => {
    const padding = 50;
    const maxWidth = window.innerWidth - padding;
    const floorY = getFloorLevel();
    const newLeft = Math.floor(Math.random() * (maxWidth - padding)) + padding / 2;

    setPosition((prev) => {
      if (prev && newLeft < prev.left) setIsFlipped(true);
      else setIsFlipped(false);
      return { top: floorY, left: newLeft };
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isInteracting || isFalling || isDropping) return;
    setIsDragging(true);
    if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);

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
    const floorY = getFloorLevel();
    if (position && position.top < floorY) {
      setIsFalling(true);
      playRandomSound();
      setPosition({ top: floorY, left: position.left });
      if (dropTimeoutRef.current) clearTimeout(dropTimeoutRef.current);
      dropTimeoutRef.current = setTimeout(() => {
        setIsFalling(false);
        setIsDropping(true);
        setTimeout(() => {
          setIsDropping(false);
          moveBottomOnly();
          if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
          moveIntervalRef.current = setInterval(moveBottomOnly, 4000);
        }, 1000);
      }, 500);

    } else {
      moveBottomOnly();
      moveIntervalRef.current = setInterval(moveBottomOnly, 4000);
    }

  }, [isDragging, position, moveBottomOnly]);

  const handleClick = () => {
    if (isDragging || isFalling || isDropping) return;

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
    if (isInteracting || isDragging || isFalling || isDropping) return;
    const startTimer = setTimeout(() => {
       moveBottomOnly();
    }, 100);

    moveIntervalRef.current = setInterval(moveBottomOnly, 4000);

    return () => {
      clearTimeout(startTimer);
      if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (dropTimeoutRef.current) clearTimeout(dropTimeoutRef.current);
    };
  }, [isInteracting, isDragging, isFalling, isDropping, moveBottomOnly]);


  if (!position) return null;
  let currentImage = normalImage;
  if (isDragging) currentImage = dragImage;
  else if (isFalling) currentImage = dragImage;
  else if (isDropping) currentImage = dropImage;
  else if (isInteracting) currentImage = talkImage;
  let transitionClass = "transition-all duration-[3000ms] ease-in-out";
  
  if (isDragging) {
    transitionClass = "transition-none duration-0";
  } else if (isFalling) {
    transitionClass = "transition-all duration-500 ease-in"; 
  } else if (isInteracting || isDropping) {
    transitionClass = "transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)";
  }

  let transformStyle = isFlipped ? "scaleX(-1) scale(1.1)" : "scaleX(1) scale(1.1)";
  if (isInteracting) {
    transformStyle = isFlipped ? "scaleX(-1.2) scaleY(0.8)" : "scaleX(1.2) scaleY(0.8)";
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
        touchAction: "none"
      }}
    >
      <Image
        src={currentImage}
        alt="Speaki Mascot"
        width={90}
        height={90}
        className={`pointer-events-none select-none ${
            (!isInteracting && !isDragging && !isFalling && !isDropping) ? "animate-bounce-walk" : ""
        }`}
        draggable={false}
      />
    </div>
  );
}