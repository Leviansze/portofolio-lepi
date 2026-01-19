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
  | 'POINTING'
  | 'CLIMBING';

type Direction = 'LEFT' | 'RIGHT';

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
  "Ada apa di sana?", "Hmm...", "Tralala~", "Aku Speaki!", "Web ini bagus..."
];

export default function SpeakiMascot() {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [status, setStatus] = useState<MascotStatus>('WALKING');
  const [direction, setDirection] = useState<Direction>('RIGHT'); 
  const [isFlipped, setIsFlipped] = useState(false); 
  const [isHolding, setIsHolding] = useState(false); 
  const [walkDuration, setWalkDuration] = useState(3000); 

  const [speechText, setSpeechText] = useState<string | null>(null);
  const [emoteIcon, setEmoteIcon] = useState<string | null>(null);

  const mascotRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const hasInteractedRef = useRef(false);
  const lastInteractionTime = useRef<number>(Date.now());
  const initialPosRef = useRef<{ top: number; left: number } | null>(null);
  
  const movementTimerRef = useRef<NodeJS.Timeout | null>(null); 
  const chatterTimerRef = useRef<NodeJS.Timeout | null>(null); 
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const emoteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragAngryTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const isPointerDown = useRef(false);
  const hasMoved = useRef(false);

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
    if (!force && timeSince < 1500) return;

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
    audioRef.current.play().catch(() => {});
    
    if (force) {
        lastInteractionTime.current = Date.now();
    }
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

  const startLinearWalk = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const padding = 60;
    const maxWidth = window.innerWidth - padding;
    const floorY = getFloorLevel();
    
    const targetLeft = direction === 'RIGHT' ? maxWidth : padding;
    
    let currentLeft = padding; 
    if (mascotRef.current) {
        currentLeft = mascotRef.current.getBoundingClientRect().left;
    }

    const distance = Math.abs(targetLeft - currentLeft);
    const speed = 70; 
    const duration = Math.max((distance / speed) * 1000, 1000); 

    setWalkDuration(duration);
    setPosition({ top: floorY, left: targetLeft });
    setIsFlipped(direction === 'LEFT'); 

    if (movementTimerRef.current) clearTimeout(movementTimerRef.current);
    
    movementTimerRef.current = setTimeout(() => {
        const actionRoll = Math.random();

        if (actionRoll < 0.3) {
            setStatus('CLIMBING');
            const climbHeight = 250;
            const targetTop = floorY - climbHeight;
            
            setWalkDuration(1500); 
            setPosition({ top: targetTop, left: targetLeft });

            actionTimeoutRef.current = setTimeout(() => {
                setStatus('FALLING');
                
                const fallOffset = direction === 'RIGHT' ? -80 : 80;
                setPosition({ top: floorY, left: targetLeft + fallOffset });
                
                playSound("/sounds/uaa.mp3", true);
                showSpeech("Waaaa!", 1000);

                setTimeout(() => {
                     setStatus('LANDING');
                     showEmote("💫");
                     showSpeech("Aduh.", 1000);

                     setTimeout(() => {
                        setDirection(prev => prev === 'RIGHT' ? 'LEFT' : 'RIGHT');
                        setStatus('WALKING');
                     }, 2000);
                }, 500);

            }, 1500);

        } else {
            setStatus('BONKED');
            playSound("/sounds/uaa.mp3", true); 
            showEmote("💫");
            showSpeech("Aduh!", 1500);

            const bounceBack = direction === 'RIGHT' ? targetLeft - 50 : targetLeft + 50;
            setWalkDuration(200); 
            setPosition({ top: floorY, left: bounceBack });

            actionTimeoutRef.current = setTimeout(() => {
                setDirection(prev => prev === 'RIGHT' ? 'LEFT' : 'RIGHT');
                setStatus('WALKING'); 
            }, 2000);
        }

    }, duration);

  }, [direction, getFloorLevel, playSound, showEmote, showSpeech]);

  useEffect(() => {
    const scheduleNextChatter = () => {
        const nextTime = Math.random() * (12000 - 6000) + 6000;
        
        chatterTimerRef.current = setTimeout(() => {
            if (status === 'WALKING' && hasInteractedRef.current) {
                const dice = Math.random();
                
                if (dice < 0.4) {
                    setStatus('POINTING');
                    showSpeech("Wah!", 1500);
                    setTimeout(() => setStatus('WALKING'), 2000);
                } else {
                    showSpeech(randomTalks[Math.floor(Math.random() * randomTalks.length)]);
                    playSound(idleSounds, false);
                }
            }
            scheduleNextChatter(); 
        }, nextTime);
    };

    scheduleNextChatter();

    return () => {
        if (chatterTimerRef.current) clearTimeout(chatterTimerRef.current);
    };
  }, [status, playSound, showSpeech]); 

  const handleStart = useCallback((clientX: number, clientY: number) => {
    hasInteractedRef.current = true;
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    if (status === 'FALLING' || status === 'LANDING' || status === 'BONKED') return;
    
    setIsHolding(true);

    if (movementTimerRef.current) clearTimeout(movementTimerRef.current);
    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
    if (dragAngryTimerRef.current) clearTimeout(dragAngryTimerRef.current);

    isPointerDown.current = true;
    hasMoved.current = false;
    dragStartPos.current = { x: clientX, y: clientY };

    if (mascotRef.current) {
      const rect = mascotRef.current.getBoundingClientRect();
      initialPosRef.current = { top: rect.top, left: rect.left };
    }

    dragAngryTimerRef.current = setTimeout(() => {
        if (isPointerDown.current && hasMoved.current) {
            showEmote("💢");
            showSpeech("Turunkan aku!", 2000);
        }
    }, 3000);

  }, [status, showEmote, showSpeech]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isPointerDown.current || !dragStartPos.current || !initialPosRef.current) return;

    const moveThreshold = 10; 
    const deltaX = clientX - dragStartPos.current.x;
    const deltaY = clientY - dragStartPos.current.y;

    if (!hasMoved.current && (Math.abs(deltaX) > moveThreshold || Math.abs(deltaY) > moveThreshold)) {
        hasMoved.current = true;
        setStatus('DRAGGING');
        setIsHolding(true);
    }

    if (hasMoved.current) {
        const newLeft = initialPosRef.current.left + deltaX;
        const newTop = initialPosRef.current.top + deltaY;
        
        setPosition({ top: newTop, left: newLeft });
        
        if (position && newLeft < position.left) setIsFlipped(true);
        else if (position && newLeft > position.left) setIsFlipped(false);
    }
  }, [position]);

  const handleEnd = useCallback(() => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsHolding(false);

    if (dragAngryTimerRef.current) clearTimeout(dragAngryTimerRef.current);

    if (hasMoved.current) {
        const floorY = getFloorLevel();
        if (position && position.top < floorY - 20) {
            setStatus('FALLING');
            setPosition((prev) => prev ? { ...prev, top: floorY } : null);
            
            playSound("/sounds/uaa.mp3", true); 
            showSpeech("Aaaaaa!", 1000);
            
            actionTimeoutRef.current = setTimeout(() => {
                setStatus('LANDING'); 
                showEmote("💫"); 
                showSpeech("Aduh.", 1000);
                
                setTimeout(() => { 
                    const centerX = window.innerWidth / 2;
                    const dropX = position?.left || 0;
                    setDirection(dropX < centerX ? 'RIGHT' : 'LEFT'); 
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
        }, 2500); 
    }
  }, [position, getFloorLevel, playSound, showSpeech, showEmote]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
        if (position && (status === 'INTERACTING' || status === 'POINTING')) {
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

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [handleMove, handleEnd, position, status]);

  useEffect(() => {
    if (status === 'WALKING' && !isHolding) {
        const timer = setTimeout(() => {
            startLinearWalk();
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [status, isHolding, startLinearWalk]);

  useEffect(() => {
    const timer = setTimeout(() => { 
      const padding = 60;
      if (typeof window !== "undefined") {
        const floorY = window.innerHeight - 130;
        setPosition({ top: floorY, left: padding });
        setDirection('RIGHT');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []); 

  if (!position) return null;

  let currentImage = normalImage;
  let transitionClass = "";
  let pScaleX = 1.1;
  let pScaleY = 1.1;
  let pRotate = 0;
  let isBounceAnim = false;

  switch (status) {
    case 'WALKING':
      currentImage = normalImage;
      transitionClass = isHolding ? "transition-none" : `transition-all ease-linear`;
      isBounceAnim = !isHolding;
      break;
    case 'INTERACTING':
      currentImage = talkImage;
      transitionClass = "transition-transform duration-200 cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      pScaleX = 1.2; pScaleY = 0.8;
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
      pScaleX = 1.3; pScaleY = 0.6;
      break;
    case 'SLEEPING':
      currentImage = sleepImage;
      transitionClass = "transition-all duration-500";
      pScaleX = 1.05; pScaleY = 1.05;
      break;
     case 'BONKED':
      currentImage = bonkImage;
      transitionClass = "transition-transform duration-100";
      pScaleX = 0.8; pScaleY = 1.2;
      break;
    case 'POINTING':
      currentImage = pointImage;
      transitionClass = "transition-all duration-300";
      break;
    case 'CLIMBING':
      currentImage = normalImage;
      transitionClass = "transition-all ease-linear";
      pRotate = direction === 'RIGHT' ? -90 : 90;
      isBounceAnim = true;
      break;
  }

  const flipScale = isFlipped ? -1 : 1;
  let transformStyle = `scaleX(${flipScale * pScaleX}) scaleY(${pScaleY})`;
  if (pRotate !== 0) {
      transformStyle = `rotate(${pRotate}deg) scale(${pScaleX})`;
  }

  const invScaleX = 1 / pScaleX;
  const invScaleY = 1 / pScaleY;
  const bubbleFlipCorrection = isFlipped ? -1 : 1;
  const bubbleTransformStyle = `rotate(${-pRotate}deg) scale(${invScaleX * bubbleFlipCorrection}, ${invScaleY})`;

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
        zIndex: 9999,
        transitionDuration: (status === 'WALKING' || status === 'CLIMBING') && !isHolding ? `${walkDuration}ms` : undefined
      }}
    >
      <div style={{ transform: bubbleTransformStyle, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {speechText && (
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 font-medium border border-gray-200">
            {speechText}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
            </div>
        )}

        {emoteIcon && (
            <div className="absolute -top-10 right-0 text-3xl animate-bounce filter drop-shadow-sm">
            {emoteIcon}
            </div>
        )}
      </div>

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