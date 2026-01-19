"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

type MascotStatus = 
  | 'WALKING' 
  | 'INTERACTING' 
  | 'DRAGGING' 
  | 'FALLING' 
  | 'LANDING' 
  | 'SLEEPING' 
  | 'BONKED'   
  | 'POINTING';

const clickSounds = [
  "/sounds/a.mp3",
  "/sounds/aau.mp3",
  "/sounds/deruzibazeyoonly.mp3",
  "/sounds/speaki.mp3",
  "/sounds/uaa.mp3", 
];

const idleSounds = [
  "/sounds/chuayo.mp3",
  "/sounds/deruzibazeyo.mp3",
  "/sounds/fullbazeyo.mp3",
  "/sounds/morijabadangizibazeyo.mp3",
  "/sounds/murugorureziru.mp3",
  "/sounds/sunbakochi.mp3",
];

const randomTalks = [
  "Nyaman sekali di sini...", "Rico keren ya...", "Berjalan-jalan~", 
  "Ada apa di sana?", "Hmm...", "Tralala~"
];

export default function SpeakiMascot() {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [status, setStatus] = useState<MascotStatus>('WALKING');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHolding, setIsHolding] = useState(false); 

  const [speechText, setSpeechText] = useState<string | null>(null);
  const [emoteIcon, setEmoteIcon] = useState<string | null>(null);

  const mascotRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const hasInteractedRef = useRef(false);
  const lastInteractionTime = useRef<number>(Date.now());
  
  const walkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const emoteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragAngryTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const hasMoved = useRef(false);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 }); 

  const normalImage = "/speaki.png";
  const talkImage = "/speaki-cry.png";
  const dragImage = "/speaki-drag.png";
  const dropImage = "/speaki-drop.png";
  const sleepImage = "/speaki-sleep.png"; 
  const bonkImage = "/speaki-bonk.png";  
  const pointImage = "/speaki-pointing.png"; 

  const getFloorLevel = useCallback(() => {
    if (typeof window === "undefined") return 0;
    return window.innerHeight - 130; 
  }, []);

  const playSound = useCallback((source: string[] | string, force = false) => {
    if (!force && !hasInteractedRef.current) return;

    const timeSince = Date.now() - lastInteractionTime.current;
    if (!force && timeSince < 2000) return;

    let soundToPlay: string;
    if (Array.isArray(source)) {
        if (source.length === 0) return;
        soundToPlay = source[Math.floor(Math.random() * source.length)];
    } else {
        soundToPlay = source;
    }

    if (audioRef.current) { 
        audioRef.current.pause(); 
        audioRef.current.currentTime = 0; 
    }
    
    audioRef.current = new Audio(soundToPlay);
    audioRef.current.volume = 0.6;
    audioRef.current.play().catch(() => {
    });
    
    lastInteractionTime.current = Date.now();
  }, []);

  const showSpeech = useCallback((text: string, duration = 2000) => {
    setSpeechText(text);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => setSpeechText(null), duration);
  }, []);

  const showEmote = useCallback((icon: string, duration = 1500) => {
    setEmoteIcon(icon);
    if (emoteTimeoutRef.current) clearTimeout(emoteTimeoutRef.current);
    emoteTimeoutRef.current = setTimeout(() => setEmoteIcon(null), duration);
  }, []);

  const moveBottomOnly = useCallback(() => {
    if (status !== 'WALKING') return;

    const padding = 60;
    if (typeof window === "undefined") return;

    const maxWidth = window.innerWidth - padding;
    const floorY = getFloorLevel();
    
    if (Math.random() < 0.05) {
        setStatus('POINTING');
        showSpeech("Wah, apa itu?", 1500);
        actionTimeoutRef.current = setTimeout(() => {
            setStatus('WALKING');
        }, 2000);
        return;
    }
    
    if (Math.random() < 0.03 && !speechText) {
       if (hasInteractedRef.current) {
         const timeSince = Date.now() - lastInteractionTime.current;
         if (timeSince > 5000) {
             showSpeech(randomTalks[Math.floor(Math.random() * randomTalks.length)]);
             playSound(idleSounds, false);
         }
       }
    }

    let newLeft = Math.floor(Math.random() * (maxWidth - padding)) + padding / 2;

    if (newLeft < padding + 20 || newLeft > maxWidth - 20) {
       setStatus('BONKED');
       playSound("/sounds/uaa.mp3", true); 
       showEmote("💫");
       showSpeech("Aduh! Tembok...", 1500);

       const bounceBack = newLeft < padding + 20 ? newLeft + 50 : newLeft - 50;
       setPosition({ top: floorY, left: bounceBack });

       actionTimeoutRef.current = setTimeout(() => {
          setStatus('WALKING');
       }, 2000);
       return;
    }

    setPosition((prev) => {
      if (prev && newLeft < prev.left) setIsFlipped(true);
      else setIsFlipped(false);
      return { top: floorY, left: newLeft };
    });
  }, [getFloorLevel, playSound, showSpeech, showEmote, speechText, status]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    
    if (status === 'SLEEPING') {
        setStatus('WALKING');
        playSound("/sounds/a.mp3", true); 
        showEmote("❗");
    }

    idleTimerRef.current = setTimeout(() => {
        if (status === 'WALKING' && !isHolding) {
            setStatus('SLEEPING');
            showEmote("💤");
        }
    }, 15000); 
  }, [status, isHolding, playSound, showEmote]);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    hasInteractedRef.current = true;

    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    if (status === 'FALLING' || status === 'LANDING' || status === 'BONKED') return;
    
    resetIdleTimer();
    setIsHolding(true);

    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
    if (dragAngryTimerRef.current) clearTimeout(dragAngryTimerRef.current);

    isPointerDown.current = true;
    hasMoved.current = false;
    dragStartPos.current = { x: clientX, y: clientY };

    if (mascotRef.current) {
      const rect = mascotRef.current.getBoundingClientRect();
      
      const width = 90;
      const height = 90;
      const scale = 1.1;
      const correctionX = (width * (scale - 1)) / 2; 
      const correctionY = (height * (scale - 1));    
      
      const correctedLeft = rect.left + correctionX;
      const correctedTop = rect.top + correctionY;

      setPosition({ top: correctedTop, left: correctedLeft });
      dragOffset.current = { x: clientX - correctedLeft, y: clientY - correctedTop };
    }

    dragAngryTimerRef.current = setTimeout(() => {
        if (isPointerDown.current && hasMoved.current) {
            showEmote("💢");
            showSpeech("Turunkan aku!", 2000);
        }
    }, 3000);

  }, [status, resetIdleTimer, showEmote, showSpeech]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    mousePosRef.current = { x: clientX, y: clientY }; 
    resetIdleTimer();

    if (!isPointerDown.current || !dragStartPos.current) return;

    const moveThreshold = 5;
    if (!hasMoved.current && (Math.abs(clientX - dragStartPos.current.x) > moveThreshold || Math.abs(clientY - dragStartPos.current.y) > moveThreshold)) {
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
  }, [position, resetIdleTimer]);

  const handleEnd = useCallback(() => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsHolding(false);

    if (dragAngryTimerRef.current) clearTimeout(dragAngryTimerRef.current);
    resetIdleTimer();

    if (hasMoved.current) {
        const floorY = getFloorLevel();
        if (position && position.top < floorY - 20) {
            setStatus('FALLING');
            setPosition((prev) => prev ? { ...prev, top: floorY } : null);
            playSound("/sounds/uaa.mp3", true); 
            showSpeech("Aaaaaa!", 1000);
            
            lastInteractionTime.current = Date.now() + 4000;

            actionTimeoutRef.current = setTimeout(() => {
                setStatus('LANDING'); 
                playSound("/sounds/uaa.mp3", true); 
                showEmote("💫"); 
                showSpeech("Aduh.", 1000);
                
                setTimeout(() => { 
                  setStatus('WALKING'); 
                }, 2000); 
            }, 500); 
        } else {
            setStatus('WALKING');
        }
    } else {
        setStatus('INTERACTING');
        playSound(clickSounds, true); 
        showEmote("❤️"); 
        
        if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
        actionTimeoutRef.current = setTimeout(() => {
            setStatus('WALKING');
            moveBottomOnly();
        }, 2500); 
    }
  }, [position, getFloorLevel, playSound, moveBottomOnly, resetIdleTimer, showSpeech, showEmote]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
        if (position && (status === 'INTERACTING' || status === 'SLEEPING' || status === 'POINTING')) {
             if (e.clientX < position.left) setIsFlipped(true);
             else setIsFlipped(false);
        }
    };
    const handleGlobalMouseUp = () => handleEnd();
    const handleGlobalTouchMove = (e: TouchEvent) => {
        if (isPointerDown.current && hasMoved.current) e.preventDefault();
        if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleGlobalTouchEnd = () => handleEnd();

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    window.addEventListener('touchend', handleGlobalTouchEnd);

    resetIdleTimer();

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [handleMove, handleEnd, resetIdleTimer, position, status]);

  useEffect(() => {
    if (status === 'WALKING' && !isHolding) {
      walkIntervalRef.current = setInterval(moveBottomOnly, 4000);
      return () => { if (walkIntervalRef.current) clearInterval(walkIntervalRef.current); };
    }
  }, [status, moveBottomOnly, isHolding]);

  useEffect(() => {
    const timer = setTimeout(() => { 
      const padding = 60;
      if (typeof window !== "undefined") {
        const maxWidth = window.innerWidth - padding;
        const floorY = window.innerHeight - 130;
        const newLeft = Math.floor(Math.random() * (maxWidth - padding)) + padding / 2;
        setPosition((prev) => {
            if (prev && newLeft < prev.left) setIsFlipped(true);
            else setIsFlipped(false);
            return { top: floorY, left: newLeft };
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []); 

  if (!position) return null;

  let currentImage = normalImage;
  let transitionClass = "";
  let transformStyle = isFlipped ? "scaleX(-1) scale(1.1)" : "scaleX(1) scale(1.1)";
  let isBounceAnim = false;

  switch (status) {
    case 'WALKING':
      currentImage = normalImage;
      transitionClass = isHolding ? "transition-none duration-0" : "transition-all duration-[3000ms] ease-in-out";
      isBounceAnim = !isHolding;
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
    case 'SLEEPING':
      currentImage = sleepImage;
      transitionClass = "transition-all duration-500";
      transformStyle = isFlipped ? "scaleX(-1) scale(1.05)" : "scaleX(1) scale(1.05)"; 
      break;
     case 'BONKED':
      currentImage = bonkImage;
      transitionClass = "transition-transform duration-100";
      transformStyle = isFlipped ? "scaleX(-0.8) scaleY(1.2)" : "scaleX(0.8) scaleY(1.2)";
      break;
    case 'POINTING':
      currentImage = pointImage;
      transitionClass = "transition-all duration-300";
      break;
  }

  return (
    <div
      ref={mascotRef}
      onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX, e.clientY); }}
      onTouchStart={(e) => { if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY); }}
      className={`fixed z-50 cursor-grab active:cursor-grabbing ${transitionClass}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transformOrigin: "bottom center",
        transform: transformStyle,
        userSelect: "none", WebkitUserSelect: "none", touchAction: "none",
        willChange: status === 'DRAGGING' ? 'top, left' : 'transform',
        zIndex: 9999 
      }}
    >
      {speechText && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap pointer-events-none animate-in fade-in slide-in-from-bottom-2 font-medium border border-gray-200">
          {speechText}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
        </div>
      )}

      {emoteIcon && (
        <div className="absolute -top-10 right-0 text-3xl animate-bounce pointer-events-none filter drop-shadow-sm">
          {emoteIcon}
        </div>
      )}

      <Image
        src={currentImage}
        alt="Speaki Mascot"
        width={90}
        height={90}
        className={`pointer-events-none select-none ${isBounceAnim ? 'animate-bounce-walk' : ''} ${status === 'SLEEPING' ? 'animate-pulse' : ''}`}
        draggable={false}
        priority
      />
    </div>
  );
}