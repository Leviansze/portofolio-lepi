"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

type MascotStatus = 'WALKING' | 'INTERACTING' | 'DRAGGING' | 'FALLING' | 'LANDING';

const sounds = [
    "/sounds/a.mp3",
    "/sounds/aau.mp3",
    "/sounds/deruzibazeyoonly.mp3",
    "/sounds/speaki.mp3",
    "/sounds/uaa.mp3",
];

export default function SpeakiMascot() {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [status, setStatus] = useState<MascotStatus>('WALKING');
  const [isFlipped, setIsFlipped] = useState(false);

  const mascotRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const walkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const normalImage = "/speaki.png";
  const talkImage = "/speaki-cry.png";
  const dragImage = "/speaki-drag.png";
  const dropImage = "/speaki-drop.png";

  const getFloorLevel = useCallback(() => {
    if (typeof window === "undefined") return 0;
    return window.innerHeight - 130; 
  }, []);

  const playRandomSound = useCallback(() => {
    if (sounds.length === 0) return;
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    audioRef.current = new Audio(randomSound);
    audioRef.current.volume = 0.6;
    audioRef.current.play().catch(() => {});
  }, []);

  const moveBottomOnly = useCallback(() => {
    const padding = 50;
    if (typeof window === "undefined") return;
    
    const maxWidth = window.innerWidth - padding;
    const floorY = window.innerHeight - 130;
    const newLeft = Math.floor(Math.random() * (maxWidth - padding)) + padding / 2;

    setPosition((prev) => {
      if (prev && newLeft < prev.left) setIsFlipped(true);
      else setIsFlipped(false);
      return { top: floorY, left: newLeft };
    });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (status === 'DRAGGING' || status === 'FALLING' || status === 'LANDING') return;
    
    e.stopPropagation();
    
    setStatus('INTERACTING');
    
    playRandomSound();
    
    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
    actionTimeoutRef.current = setTimeout(() => {
      setStatus('WALKING');
      moveBottomOnly();
    }, 2500); 
  }, [status, playRandomSound, moveBottomOnly]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (status === 'FALLING' || status === 'LANDING') return;

    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);

    if (mascotRef.current) {
      const rect = mascotRef.current.getBoundingClientRect();
      setPosition({ top: rect.top, left: rect.left });
      
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    setStatus('DRAGGING');
  }, [status]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (status !== 'DRAGGING') return;

    const newLeft = e.clientX - dragOffset.current.x;
    const newTop = e.clientY - dragOffset.current.y;

    setPosition({ top: newTop, left: newLeft });

    if (position && newLeft < position.left) setIsFlipped(true);
    else if (position && newLeft > position.left) setIsFlipped(false);
  }, [status, position]);

  const handleMouseUp = useCallback(() => {
    if (status !== 'DRAGGING') return;

    const floorY = getFloorLevel();
    
    if (position && position.top < floorY - 20) {
      setStatus('FALLING');
      
      setPosition((prev) => prev ? { ...prev, top: floorY } : null);

      actionTimeoutRef.current = setTimeout(() => {
        setStatus('LANDING'); 
        playRandomSound();    
        
        setTimeout(() => {
          setStatus('WALKING');
        }, 1500); 
        
      }, 500); 

    } else {
      setStatus('WALKING');
    }
  }, [status, position, getFloorLevel, playRandomSound]);

  useEffect(() => {
    if (status === 'DRAGGING') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [status, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (status === 'WALKING') {
      walkIntervalRef.current = setInterval(moveBottomOnly, 4000);
      return () => {
        if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
      };
    }
  }, [status, moveBottomOnly]);

  useEffect(() => {
    const timer = setTimeout(() => {
        moveBottomOnly();
    }, 0);
    return () => clearTimeout(timer);
  }, [moveBottomOnly]);

  if (!position) return null;

  let currentImage = normalImage;
  let transitionClass = "";
  let transformStyle = isFlipped ? "scaleX(-1) scale(1.1)" : "scaleX(1) scale(1.1)";

  switch (status) {
    case 'WALKING':
      currentImage = normalImage;
      transitionClass = "transition-all duration-[3000ms] ease-in-out";
      break;
    case 'INTERACTING':
      currentImage = talkImage;
      transitionClass = "transition-transform duration-200 cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      transformStyle = isFlipped ? "scaleX(-1.2) scaleY(0.8)" : "scaleX(1.2) scaleY(0.8)";
      break;
    case 'DRAGGING':
      currentImage = dragImage;
      transitionClass = "transition-none";
      break;
    case 'FALLING':
      currentImage = dragImage;
      transitionClass = "transition-all duration-500 ease-in"; 
      break;
    case 'LANDING':
      currentImage = dropImage;
      transitionClass = "transition-transform duration-200";
      transformStyle = isFlipped ? "scaleX(-1.3) scaleY(0.6)" : "scaleX(1.3) scaleY(0.6)";
      break;
  }

  return (
    <div
      ref={mascotRef}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className={`fixed z-50 cursor-grab active:cursor-grabbing ${transitionClass}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transformOrigin: "bottom center",
        transform: transformStyle,
        userSelect: "none",
        touchAction: "none",
        willChange: status === 'DRAGGING' ? 'top, left' : 'transform'
      }}
    >
      <Image
        src={currentImage}
        alt="Speaki Mascot"
        width={90}
        height={90}
        className={`pointer-events-none select-none ${
          status === 'WALKING' ? 'animate-bounce-walk' : ''
        }`}
        draggable={false}
        priority
      />
    </div>
  );
}