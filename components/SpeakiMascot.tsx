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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const walkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const hasMoved = useRef(false);

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

  const handleStart = useCallback((clientX: number, clientY: number) => {
    if (status === 'FALLING' || status === 'LANDING') return;

    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);

    isPointerDown.current = true;
    hasMoved.current = false;
    dragStartPos.current = { x: clientX, y: clientY };

    if (mascotRef.current) {
      const rect = mascotRef.current.getBoundingClientRect();
      setPosition({ top: rect.top, left: rect.left });
      dragOffset.current = {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }
  }, [status]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isPointerDown.current || !dragStartPos.current) return;

    const moveThreshold = 5;
    const deltaX = Math.abs(clientX - dragStartPos.current.x);
    const deltaY = Math.abs(clientY - dragStartPos.current.y);

    if (!hasMoved.current && (deltaX > moveThreshold || deltaY > moveThreshold)) {
        hasMoved.current = true;
        setStatus('DRAGGING');
    }

    if (hasMoved.current) {
        const newLeft = clientX - dragOffset.current.x;
        const newTop = clientY - dragOffset.current.y;

        setPosition({ top: newTop, left: newLeft });

        if (position && newLeft < position.left) setIsFlipped(true);
        else if (position && newLeft > position.left) setIsFlipped(false);
    }
  }, [position]);

  const handleEnd = useCallback(() => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;

    if (hasMoved.current) {
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
    } else {
        setStatus('INTERACTING');
        playRandomSound();
        
        if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
        actionTimeoutRef.current = setTimeout(() => {
            setStatus('WALKING');
            moveBottomOnly();
        }, 2500); 
    }
  }, [position, getFloorLevel, playRandomSound, moveBottomOnly]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onWindowMouseUp = () => handleEnd();
    
    const onWindowTouchMove = (e: TouchEvent) => {
        if (isPointerDown.current && hasMoved.current) {
             e.preventDefault(); 
        }
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    };
    const onWindowTouchEnd = () => handleEnd();

    if (isPointerDown.current) {
      window.addEventListener('mousemove', onWindowMouseMove);
      window.addEventListener('mouseup', onWindowMouseUp);
      window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
      window.addEventListener('touchend', onWindowTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('touchmove', onWindowTouchMove);
      window.removeEventListener('touchend', onWindowTouchEnd);
    };
  }, [handleMove, handleEnd]);

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
    }, 100);
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
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={`fixed z-50 cursor-grab active:cursor-grabbing ${transitionClass}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transformOrigin: "bottom center",
        transform: transformStyle,
        userSelect: "none",
        WebkitUserSelect: "none",
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