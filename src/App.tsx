/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Heart, Coffee, Sparkles, Music, Star, Navigation2, X, User, MessageCircle, Home, Image as ImageIcon, Send, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import confettiModule from 'canvas-confetti';
const confetti = confettiModule.create(null, { useWorker: false, resize: true });

// Custom Ring Icon for the Proposal tab
const Ring = ({ size = 20, ...props }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <circle cx="12" cy="14" r="6" />
    <path d="M12 8V5" />
    <path d="M9 4l3-3 3 3-3 3-3-3z" fill={props.fill === "currentColor" ? "currentColor" : "none"} />
  </svg>
);

// --- CONFIGURATION SECTION ---
const TIMELINE_EVENTS = [
  {
    title: "Our First Selfie 🤳",
    date: "June 30, 2025",
    description: "The moment we captured our forever in a single frame. Two souls, one smile, and the beginning of a beautiful journey.",
    icon: Star,
    image: "https://i.postimg.cc/JzJb2T7R/IMG-20250630-072911.jpg", 
    extraImages: ["https://i.postimg.cc/6pRdmH6W/IMG-20250630-072925.jpg"], 
    secretNote: "I remember that day so clearly. Our first picture together as a couple... you looked absolutely beautiful. I'll cherish this moment forever. ❤️"
  },
  {
    title: "The Strength in Your Eyes 👁️✨",
    date: "April 7, 2026",
    description: "There's a magic in the way you look at me. It's not just love; it's a belief that makes me feel like I can conquer the world.",
    icon: Heart,
    image: "https://i.postimg.cc/658PJ6RX/8e92dce2-7165-4a13-a234-1e8f935dc272.jpg",
    extraImages: ["https://i.postimg.cc/8P7YQkWT/184611a6-ff1a-49bb-8ec4-28975e0093d8.jpg"],
    secretNote: "Trinita, whenever I feel low or lose my way, I just look into your eyes. They are my sanctuary. You don't realize how much strength you give me just by being you. Your gaze is like a silent promise that everything will be okay. It's because of you that I've found the confidence to be the man I am today. You are my power, my anchor, and my greatest motivation. I love you, Munuu. ❤️"
  },
  {
    title: "Me Annoying You 😜",
    date: "December 23, 2025",
    description: "They say if you don't annoy your partner, are you even in love? These moments are some of my favorites because even when you're mad at me, you're the most adorable person on Earth.",
    icon: Heart,
    image: "https://i.postimg.cc/vmy6SfZp/Screenshot-2025-12-23-12-28-22-43-8c9f6584ca98fa3eab4829abe86aac46.jpg",
    extraImages: ["https://i.postimg.cc/QMDWn1d2/Screenshot-2025-12-23-12-29-09-19-8c9f6584ca98fa3eab4829abe86aac46.jpg"],
    secretNote: "The only thing I love more than annoying you is loving you. I promise to keep bothering you with my love for the rest of our lives! ❤️😂"
  },
  {
    title: "Our Silent Promises 🌾✨",
    date: "April - May 2025",
    description: "The evenings that built our foundation. Walking hand in hand through the fields, sharing those little talks that meant everything.",
    icon: Navigation2,
    image: "https://i.postimg.cc/3JK7Ch5V/IMG-20250402-WA0012.jpg",
    extraImages: ["https://i.postimg.cc/rF8cCT2L/IMG20250709183542.jpg"],
    secretNote: "Before we were even together, we were already building a world. Those evening walks in the field, holding your hand for the first time, those choti choti baate... they hit me so hard now. Every step we took was a silent promise to never let go. I didn't know it then, but I was already home. You made those simple walks the most magical moments of my life. I love you, Munuu. ❤️"
  },
  {
    date: "Feb 14, 2026",
    title: "A Transition of Souls",
    image: "https://i.postimg.cc/hv1yPN23/IMG-20260214-171409.jpg",
    description: "A day when everything shifted. We wasn't just two separate lives anymore; we became a single melody.",
    icon: Heart,
    caption: "The day it became 'Forever'.",
    secretNote: "That Valentine's Day... it wasn't just about the food I cooked or the room we were in. It was the day our walls finally crumbled. In that silence, in that intimacy, it felt like our souls finally recognized each other. We weren't just two people anymore; we became one rhythm, one breath. Everything changed that day. We reached a depth I never knew existed, and in your eyes, I found my home. I love you beyond words, beyond skin, beyond time."
  },
  {
    title: "Your Birthday & Our First Date 🎂",
    date: "March 19, 2026",
    description: "Seeing the joy in your eyes as we celebrated YOU made me realize that my world revolves around your happiness. Every moment spent with you is a gift I never knew I deserved.",
    icon: Heart,
    image: "https://i.postimg.cc/L4g6LhHn/68aaf403-3251-4a67-b1b1-d40b65b4fd9c.jpg",
    secretNote: "Happy Birthday my love. That night, under the soft lights, I saw my whole future in your eyes. You aren't just special; you are my everything. Thank you for choosing me to walk this path with you. I love you more than words can ever say. ❤️🥺"
  }
];

const LETTER_PAGES = [
  "Trinita… my Munuu, my babyy, my sweet pumpkin ❤️,\n\nI’m sitting here trying to write this, and I swear nothing feels enough. Because whatever I put into words will still fall short of what I feel for you. 13th May… one year of us.\n\nNot a perfect year. Not some fairytale story. A real one. A year full of fights, ego, misunderstandings, overthinking, silence… and still, somehow, love that refused to leave.",
  "And if I’m being completely honest… the only reason “us” still exists today is you.\n\nBecause there were so many times I messed up. So many times I hurt you, said things without thinking, made you feel things you never deserved to feel. There were moments where you could’ve walked away so easily… and maybe you even should have.\n\nBut you didn’t. You stayed… and not in a weak way. You stayed while handling your own life, your own struggles, your own pain.",
  "I see you, Trinita. I really do.\n\nI see how much you do every single day. How tired you get. How you don’t always say it, but it shows. The way you carry your responsibilities without making noise, without asking for attention… that strength is not normal.\n\nAnd this past year… it tested you in ways I don’t think I’ll ever fully understand.",
  "Taking care of your grandmother… being there for her every day… watching her like that and still holding yourself together — that takes a different kind of heart.\n\nAnd you gave her everything you had. You didn’t run from it. You didn’t complain. \n\nYou loved her till the end. Munuu… I know no words can really take away what you’re feeling right now.",
  "Losing someone like your grandmother isn’t just losing a person… it’s losing a piece of your heart. But I need you to remember this — you are her blessing walking on this earth. \n\nThe kind of love you gave her, the way you stood by her, stayed strong for her till the very end… that doesn’t just disappear. That kind of love stays alive. It becomes a part of you.",
  "And I truly believe she’s still with you — in your strength, in your kindness, in the way you care so deeply. You didn’t leave anything undone, Munuu… you gave her everything, and that’s something not everyone can do.\n\nI know it hurts, and it will hurt for a while… but you’re not alone in this. I’m here, with you, through all of it.",
  "A part of her lives in you now… in your strength, in your softness, in your heart. So whenever you feel empty or broken, just remember — she didn’t just leave, she became a part of you.\n\nAnd as long as you’re here, loving the way you do… her love, her blessings, everything about her is still alive in this world — through you.",
  "That day when I came to your house… I didn’t think about whether I should or not. I just knew I needed to be there. Because the idea of you going through that moment without me didn’t feel right. \n\nAnd when you told me later how much that meant to you… how deeply it touched you… that’s when it hit me — I’m not just someone in your life.",
  "I’m someone you’ve made space for in your heart… in your future. And when you said you’ll only marry me… Munuu, that wasn’t a small thing. \n\nThat wasn’t just words. I felt the weight of it. And I want to answer that… properly. I can’t promise you a life without problems. I can’t promise we’ll never fight again. We both know we will.",
  "We’re not that kind of “perfect.” But I can promise you something real — I’m not going anywhere. Not when things are easy, and not when things get hard. Not when we’re laughing, and not when we’re not even talking. \n\nI’ll stay. I’ll learn. I’ll try to be better for you, not just in words but in actions.",
  "I’ll mess up sometimes, I know that… but I won’t give up on us. Ever. If you fall, I’ll be there. If you break, I’ll sit with you in it. If you feel alone, I’ll remind you that you’re not. \n\nBecause you’re not just someone I love. You’re my person.",
  "And about your grandmother… I still stand by what I said. Her blessings are with you. The love you gave her didn’t end with her. It lives in you. In the way you care, in the way you stay, in the way you love so deeply. \n\nAnd maybe that’s why you came into my life the way you did. Because I needed someone like you… even if I didn’t deserve you at times.",
  "I don’t want a future that doesn’t have you in it, Trinita. Not a single version of it feels right without you. \n\nSo if one day it really comes to that… to building a life together, to choosing each other for real… just know this — I won’t run. I’ll stand there, next to you, choosing you the same way you chose me… even when it wasn’t easy.",
  "You’re not temporary to me. You’re not just “a phase” in my life. You’re home. \n\nAnd no matter how far we go in anger, in ego, in silence… I want us to always find our way back. \n\nTo this. To us. I love you… I love you, I love love love you babyyyyyyy ❤️ Always yours, Your Posa ❤️"
];

function SpiralNotebook() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for back

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < LETTER_PAGES.length) {
      setDirection(newDirection);
      setPage(newPage);
    }
  };

  return (
    <div className="relative w-full h-full max-w-md mx-auto group select-none perspective-2000">
      {/* Real-style Spiral Spine (Static - High Detail) */}
      <div className="absolute left-4 top-8 bottom-8 w-8 z-50 pointer-events-none flex flex-col justify-between py-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="flex items-center -ml-2 relative">
            {/* The metallic ring loop - smaller and more subtle */}
            <div className="w-8 h-2 bg-gradient-to-r from-gray-500 via-gray-200 to-gray-600 rounded-full border border-gray-400/20 shadow-[1px_1px_2px_rgba(0,0,0,0.2)] ring-1 ring-white/10" />
            {/* Tiny hole in paper effect */}
            <div className="absolute left-6 w-1.5 h-1.5 bg-black/20 rounded-full blur-[0.3px]" />
          </div>
        ))}
      </div>

      {/* Realistic Shadow underneath the whole book */}
      <div className="absolute inset-0 bg-black/15 blur-3xl -z-30 transform scale-95 translate-y-12" />

      {/* Navigation Buttons Container */}
      <div className="absolute inset-0 z-40 flex justify-between pointer-events-none">
        <button 
          onClick={(e) => { e.stopPropagation(); paginate(-1); }}
          disabled={page === 0}
          className={`h-full w-24 pointer-events-auto flex items-center justify-start pl-4 cursor-pointer outline-none group/nav ${page === 0 ? 'opacity-0' : 'opacity-100'}`}
        >
           <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-rose-500 border border-white/60 shadow-lg group-hover/nav:bg-white/60 transition-all">
             <ArrowRight className="rotate-180" size={20} />
           </div>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); paginate(1); }}
          disabled={page === LETTER_PAGES.length - 1}
          className={`h-full w-24 pointer-events-auto flex items-center justify-end pr-4 cursor-pointer outline-none group/nav ${page === LETTER_PAGES.length - 1 ? 'opacity-0' : 'opacity-100'}`}
        >
           <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-rose-500 border border-white/60 shadow-lg group-hover/nav:bg-white/60 transition-all">
             <ArrowRight size={20} />
           </div>
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          initial={{ rotateY: direction > 0 ? 45 : -45, opacity: 0, originX: "0%" }}
          animate={{ rotateY: 0, opacity: 1, originX: "0%" }}
          exit={{ rotateY: direction > 0 ? -45 : 45, opacity: 0, originX: "0%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full bg-[#fcf9f2] rounded-r-[4rem] rounded-l-md shadow-2xl border border-gray-200/50 relative overflow-hidden flex flex-col p-10 pl-20 pr-10 cursor-default"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 66px, rgba(219, 109, 123, 0.1) 66px, rgba(219, 109, 123, 0.1) 68px, transparent 68px),
              linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 1.8em'
          }}
        >
          {/* Subtle Paper Texture */}
          <div className="absolute inset-0 bg-white/40 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
          
          <div className="flex-1 flex flex-col justify-start pt-4 pb-8 overflow-y-auto custom-scrollbar pr-2 min-h-0">
             <p className="font-handwriting text-base md:text-lg lg:text-xl text-gray-800 leading-[1.8em] whitespace-pre-wrap drop-shadow-sm tracking-tight text-justify">
               {LETTER_PAGES[page]}
             </p>
          </div>

          {/* Page Depth / Curvature Shadow */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/[0.05] to-transparent pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/[0.08] to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Stacked Pages depth (Static - Realistic layering) */}
      <div className="absolute -right-3 top-3 bottom-3 w-full h-full bg-white/95 -z-10 rounded-r-[4rem] border-r border-gray-300 shadow-sm" />
      <div className="absolute -right-6 top-6 bottom-6 w-full h-full bg-[#f8f8f8] -z-20 rounded-r-[4rem] border-r border-gray-200 shadow-md" />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<any>(null);

  const getAudioForTab = (tab: string) => {
    if (tab === 'discover') return '/memories.mp3';
    if (tab === 'letter') return '/leberch-calm.mp3';
    return '';
  };

  const [currentAudioSrc, setCurrentAudioSrc] = useState(() => getAudioForTab('discover'));

  const playSoftFirecracker = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const burst = (time: number, duration: number, volume: number) => {
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // white noise
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Filter to make it sound like a soft pop/thud rather than harsh static
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400 + Math.random() * 600, time);
      filter.Q.value = 1;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(volume, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(time);
    };

    // Multiple gentle bursts for confetti pop
    for (let i = 0; i < 12; i++) {
      burst(ctx.currentTime + Math.random() * 0.6, 0.2, 0.04 + Math.random() * 0.04);
    }
  };

  useEffect(() => {
    const newSrc = getAudioForTab(activeTab);
    if (newSrc === currentAudioSrc) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (audioRef.current && isPlaying) {
      const audio = audioRef.current;
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.008) {
          audio.volume = Math.max(0, audio.volume - 0.008);
        } else {
          clearInterval(fadeIntervalRef.current);
          audio.volume = 0;
          if (!newSrc) audio.pause();
          setCurrentAudioSrc(newSrc);
        }
      }, 50);
    } else {
      setCurrentAudioSrc(newSrc);
    }
  }, [activeTab, isPlaying, currentAudioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      if (!currentAudioSrc) {
        audioRef.current.pause();
        return;
      }
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.volume = 0;
        audioRef.current.play().catch(e => console.log("Playback failed:", e));
        
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.95) {
            audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.05);
          } else {
            clearInterval(fadeIntervalRef.current);
            if (audioRef.current) audioRef.current.volume = 1;
          }
        }, 50);
      } else {
        audioRef.current.volume = 1;
      }
    }
  }, [currentAudioSrc]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.volume = 1;
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        audioRef.current.volume = 1;
        if (!currentAudioSrc) return;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.error("Audio playback failed:", error);
            setIsPlaying(false);
          });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };
  const [currentCard, setCurrentCard] = useState(0);
  const [subImageIndex, setSubImageIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const [arrowAngle, setArrowAngle] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCelebration, setIsCelebration] = useState(false);
  const celebrationTriggered = useRef(false);
  const [showAnniversaryPopup, setShowAnniversaryPopup] = useState(false);

  // Cycle through extra images for a cinematic, buttery smooth feel
  useEffect(() => {
    const timer = setInterval(() => {
      setSubImageIndex((prev) => (prev + 1) % 10);
    }, 8000); // 8 second cycle to allow for 5 second transition
    return () => clearInterval(timer);
  }, []);

  // Reset flip state when switching cards
  useEffect(() => {
    setIsFlipped(false);
  }, [currentCard]);

  // Anniversary Logic: May 13, 2026, 07:45 AM
  useEffect(() => {
    const startDate = new Date('2025-05-13T07:45:00');
    const targetDate = new Date('2026-05-13T07:45:00');
    
    const urlParams = new URLSearchParams(window.location.search);
    const isAnniversaryLink = urlParams.get('msg') === 'anniversary';

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const isPastAnniversary = now.getTime() >= targetDate.getTime();

      if ((isPastAnniversary || isAnniversaryLink) && !celebrationTriggered.current) {
        setIsCelebration(true);
        setShowAnniversaryPopup(true);
        celebrationTriggered.current = true;
        playSoftFirecracker();
        
        // Launch fireworks!
        const duration = 60 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const intervalConfetti: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(intervalConfetti);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
      }

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        minutes--;
        seconds += 60;
      }
      if (minutes < 0) {
        hours--;
        minutes += 60;
      }
      if (hours < 0) {
        days--;
        hours += 24;
      }
      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setTimeElapsed({ years, months, days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tracking arrow logic for modern desktop feel
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const yesBtn = document.getElementById('yes-btn');
      if (!yesBtn) return;
      
      const rect = yesBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const angle = Math.atan2(y - e.clientY, x - e.clientX) * (180 / Math.PI) + 90;
      setArrowAngle(angle);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeTab]);

  const [noClicks, setNoClicks] = useState(0);
  const [noBtnScale, setNoBtnScale] = useState(1);

  const handleNoHover = () => {
    // Chaotic jumps + Random Rotation
    const randomX = (Math.random() - 0.5) * 280; 
    const randomY = (Math.random() - 0.8) * 450; // Jumps around the cat area more
    const randomRotate = (Math.random() - 0.5) * 120; // Aggressive spin
    
    setNoBtnPos({ x: randomX, y: randomY, rotate: randomRotate });
    
    // Shrinking effect: Progressive shrinking
    setNoBtnScale(prev => Math.max(0.1, prev * 0.8));
    setHasMovedNo(true);
  };

  const [proposalStatus, setProposalStatus] = useState<'idle' | 'asking' | 'rejected' | 'accepted'>('idle');
  const [catDialogue, setCatDialogue] = useState("Hey miss! Jyotimoy is a very good guy... he's actually the best. He sent me to ask you something! 🐾");

  const handleNoClick = () => {
    setNoClicks(prev => prev + 1);
    const dialogues = [
      "Wait... did you just try to click NO? 🙀",
      "Formalities ke liye tha bas! You can't say no. 😹",
      "Kyun pareeshaan kar rahi ho? Click the BIG ONE! 😼",
      "Aey... chota ho raha hoon main, par NO nahi dabane doonga! 😡🐾",
      "Paka mat yaar, Jyotimoy is waiting with the ring! 💍",
      "Ab toh button hi nahi dikhega... try catch me if you can! 😂"
    ];
    setCatDialogue(dialogues[Math.min(noClicks, dialogues.length - 1)]);
    handleNoHover();
  };

  const handleYesClick = () => {
    setProposalStatus('accepted');
    playSoftFirecracker();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#ffffff']
    });
    // Double burst for more impact
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ffffff']
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#ffffff']
      });
    }, 250);
  };

  return (
    <div className="h-[100dvh] bg-[#fdf2f2] font-sans text-gray-900 overflow-hidden flex flex-col selection:bg-rose-200">
      <FloatingHearts />
      
      {/* Anniversary Message Popup */}
      <AnimatePresence>
        {showAnniversaryPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-lg"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ 
                y: [0, -8, 0], 
                scale: 1, 
                opacity: 1,
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                scale: { type: "spring", bounce: 0.4, duration: 0.8 },
                opacity: { duration: 0.3 }
              }}
              className="bg-white/80 backdrop-blur-xl p-7 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(255,20,147,0.3),0_0_0_1px_rgba(255,255,255,0.6)_inset] max-w-[92%] sm:max-w-lg w-full text-center relative overflow-hidden"
            >
              {/* Decorative background glow inside popup */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-300 rounded-full blur-[60px] opacity-50 mix-blend-multiply pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-rose-300 rounded-full blur-[60px] opacity-50 mix-blend-multiply pointer-events-none" />

              <button 
                onClick={() => setShowAnniversaryPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 bg-white/50 backdrop-blur-md rounded-full transition-all w-8 h-8 flex items-center justify-center z-10"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
              
              <div className="relative z-10">
                <div className="mb-5 sm:mb-6 flex justify-center">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(255,20,147,0.1),0_0_0_4px_rgba(255,255,255,0.5)_inset]">
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                      <Heart className="text-rose-500 w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm" fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-3 sm:mb-4 font-serif leading-tight px-2">
                  365 Days of Us, Munuuu
                </h2>
                <p className="text-[14px] sm:text-[16px] text-gray-700/90 leading-relaxed mb-7 sm:mb-8 font-medium px-1 sm:px-4">
                  Exactly one year ago, at this very minute, you made me the happiest person. Every single day since then has been a blessing. Happy 1st Anniversary, my love, My Kolija, My Everything ❤️
                </p>
                <button
                  onClick={() => setShowAnniversaryPopup(false)}
                  className="w-full sm:w-[80%] py-3.5 sm:py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-[15px] sm:text-base rounded-full font-bold shadow-[0_8px_20px_-6px_rgba(255,20,147,0.5)] transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  I Love You Too! 💕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background Audio Source */}
      <audio 
        ref={audioRef}
        loop
        className="hidden"
        src={currentAudioSrc || undefined}
      />

      {/* Music Toggle Button */}
      <div className="fixed bottom-20 right-4 z-50 pointer-events-auto">
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-rose-400 opacity-40 animate-ping" style={{ animationDuration: '2.5s' }}></span>
        )}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={togglePlay}
          className="relative w-10 h-10 bg-white/70 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(244,63,94,0.3)] border border-white/80 text-rose-500 hover:bg-white hover:scale-105 active:scale-95 transition-all"
        >
          <motion.div animate={isPlaying ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] } : {}} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </motion.div>
        </motion.button>
      </div>
 
      {/* Floating Header - Frameless & Minimal */}
      <header className="fixed top-4 left-0 right-0 z-50 px-6 flex items-center justify-between max-w-lg mx-auto pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(255,182,193,0.1)] border border-white/40">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Heart size={18} className="text-rose-500" fill="currentColor" />
            </motion.div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif text-xl font-bold text-gray-800 drop-shadow-sm leading-none mb-0.5">
              Jyotimoy & Trinita
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-rose-400 animate-pulse" />
              <p className="text-[8px] text-rose-500 font-bold tracking-[0.2em] uppercase opacity-90 leading-none">
                365 Days of Forever
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pointer-events-auto shrink-0 relative"
        >
          <div className="glass px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-[1rem] border border-white/60 shadow-[0_4px_24px_rgba(255,182,193,0.2)] bg-white/40 backdrop-blur-xl flex flex-col items-center justify-center max-w-[150px] sm:max-w-none">
            <p className="text-[6px] sm:text-[7px] text-rose-600/90 font-bold uppercase tracking-[0.1em] mb-1 leading-none">Our Time Together</p>
            <motion.div 
              animate={isCelebration ? { 
                scale: [1, 1.05, 1],
                boxShadow: ["0 0 0px rgba(255,20,147,0)", "0 0 10px rgba(255,20,147,0.3)", "0 0 0px rgba(255,20,147,0)"]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 relative ${isCelebration ? 'bg-rose-50/50 p-1 rounded-lg' : ''}`}
            >
               <TimeUnit value={timeElapsed.years} label="Yrs" />
               <TimeUnit value={timeElapsed.months} label="Mts" />
               <TimeUnit value={timeElapsed.days} label="Dys" />
               <div className="w-[1px] h-3 bg-rose-300/60 mx-0.5" />
               <TimeUnit value={timeElapsed.hours} label="Hrs" />
               <TimeUnit value={timeElapsed.minutes} label="Min" />
               <TimeUnit value={timeElapsed.seconds} label="Sec" />
               
               {isCelebration && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.5, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   className="absolute -bottom-8 right-0"
                 >
                   <div className="bg-rose-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center justify-center gap-1 whitespace-nowrap">
                     <Sparkles size={8} /> HAPPY ANNIVERSARY! <Sparkles size={8} />
                   </div>
                 </motion.div>
               )}
            </motion.div>
          </div>
        </motion.div>
      </header>
 
      {/* Main Content Area adjustments for floating header */}
      <main className="flex-1 relative z-10 pt-[72px] pb-[88px] px-4 max-w-md mx-auto w-full h-full flex flex-col">
        
        {activeTab === 'discover' && (
          <div className="relative flex w-full h-full items-center justify-center">
            <div className="relative h-full max-h-[75vh] sm:max-h-[80vh] aspect-[3/4] w-auto max-w-[94vw] sm:max-w-[400px] mx-auto shrink-0">
              <AnimatePresence mode="popLayout">
                {TIMELINE_EVENTS.map((event, i) => (
                  i === currentCard && (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
                      exit={{ x: 300, opacity: 0, rotate: 20 }}
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="absolute inset-0 z-10 cursor-pointer"
                    >
                      <div className="h-full w-full rounded-[2.5rem] overflow-hidden card-shadow relative bg-white">
                        {/* Favorite Star Badge */}
                        {favorites.includes(currentCard) && (
                          <motion.div 
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-6 right-6 z-50 bg-yellow-400 text-white p-2 rounded-full shadow-lg border-2 border-white"
                          >
                            <Star size={20} fill="currentColor" />
                          </motion.div>
                        )}

                        {/* Secret Note Overlay */}
                        <AnimatePresence>
                          {isFlipped && event.secretNote && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 z-50 bg-rose-500/95 backdrop-blur-md overflow-y-auto custom-scrollbar sm:no-scrollbar p-6 py-8 sm:p-10"
                            >
                               <motion.div
                                 initial={{ y: 20 }}
                                 animate={{ y: 0 }}
                                 className="flex flex-col items-center justify-start min-h-full py-4"
                               >
                                  <Heart size={36} className="text-white/80 fill-current mx-auto mb-6 shrink-0 mt-auto" />
                                  <p className="font-cursive text-3xl sm:text-4xl text-white leading-relaxed text-center mb-auto">
                                    "{event.secretNote}"
                                  </p>
                               </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {event.extraImages ? (
                          <div className="relative w-full h-full p-4 flex items-center justify-center bg-rose-50 overflow-hidden" style={{ perspective: "1200px" }}>
                             {/* The Collage Layout - Smooth swap with keyframed zIndex cross-fade */}
                             <motion.div 
                               initial={{ rotate: -5, x: -20 }}
                               animate={{ 
                                 rotate: [-6, -4, -6],
                                 x: (subImageIndex % 2 === 0) ? -28 : -38,
                                 y: (subImageIndex % 2 === 0) ? -5 : 5,
                                 zIndex: (subImageIndex % 2 === 0) ? [0, 0, 20, 20] : [20, 20, 0, 0],
                                 scale: (subImageIndex % 2 === 0) ? [0.92, 0.94, 1, 1] : [1, 1, 0.94, 0.92],
                                 opacity: (subImageIndex % 2 === 0) ? [0.75, 0.85, 1, 1] : [1, 1, 0.85, 0.75]
                               }}
                               transition={{ 
                                 rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                                 x: { duration: 5, ease: "anticipate" },
                                 y: { duration: 5, ease: "anticipate" },
                                 zIndex: { duration: 5, times: [0, 0.45, 0.55, 1] },
                                 scale: { duration: 5, ease: "easeInOut" },
                                 opacity: { duration: 5, ease: "easeInOut" }
                               }}
                               className="absolute w-[82%] h-[88%] bg-white p-3 pb-12 rounded-sm shadow-xl"
                             >
                               <motion.img 
                                 animate={{ scale: [1, 1.05, 1], x: [0, -2, 0] }}
                                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                 src={event.image} 
                                 className="w-full h-full object-cover object-center" 
                               />
                             </motion.div>
                             
                             <motion.div 
                               initial={{ rotate: 5, x: 20 }}
                               animate={{ 
                                 rotate: [4, 6, 4],
                                 x: (subImageIndex % 2 === 1) ? 28 : 38,
                                 y: (subImageIndex % 2 === 1) ? 5 : -5,
                                 zIndex: (subImageIndex % 2 === 1) ? [0, 0, 20, 20] : [20, 20, 0, 0],
                                 scale: (subImageIndex % 2 === 1) ? [0.92, 0.94, 1, 1] : [1, 1, 0.94, 0.92],
                                 opacity: (subImageIndex % 2 === 1) ? [0.75, 0.85, 1, 1] : [1, 1, 0.85, 0.75]
                               }}
                               transition={{ 
                                 rotate: { duration: 14, repeat: Infinity, ease: "easeInOut" },
                                 x: { duration: 5, ease: "anticipate" },
                                 y: { duration: 5, ease: "anticipate" },
                                 zIndex: { duration: 5, times: [0, 0.45, 0.55, 1] },
                                 scale: { duration: 5, ease: "easeInOut" },
                                 opacity: { duration: 5, ease: "easeInOut" }
                               }}
                               className="absolute w-[82%] h-[88%] bg-white p-3 pb-12 rounded-sm shadow-2xl"
                             >
                               <motion.img 
                                 animate={{ scale: [1.05, 1, 1.05], y: [0, -2, 0] }}
                                 transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                 src={event.extraImages[0]} 
                                 className="w-full h-full object-cover object-center" 
                               />
                               <div className="absolute top-2 right-2 bg-rose-500 rounded-lg p-1">
                                  <Heart size={12} className="text-white fill-current" />
                               </div>
                             </motion.div>
                             
                             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-30" />
                          </div>
                        ) : (
                          <>
                            <motion.img 
                              animate={{ 
                                scale: [1, 1.15, 1],
                                x: [0, -10, 0],
                                y: [0, -5, 0]
                              }}
                              transition={{ 
                                duration: 15, 
                                repeat: Infinity, 
                                ease: "linear" 
                              }}
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          </>
                        )}
                        
                        {/* Interactive Glare Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-30 pointer-events-none" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 pb-8 sm:pb-10 text-white z-40 pointer-events-none">
                          <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-serif drop-shadow-md">{event.title}</h2>
                          <div className="max-h-20 overflow-y-auto custom-scrollbar mb-3 pr-2 pointer-events-auto">
                            <p className="text-[13px] sm:text-sm text-gray-100 font-medium leading-relaxed drop-shadow-sm">{event.description}</p>
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <span className="text-[13px] text-white/90 font-bold drop-shadow-md">{event.date}</span>
                          </div>
                        </div>
                    </div>
                    </motion.div>
                  )
                ))}
                </AnimatePresence>
              </div>

            {/* Floating Action Buttons */}
            <div className="absolute -bottom-4 sm:-bottom-2 left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-50 pointer-events-none">
              <div className="flex justify-center items-center gap-6 sm:gap-8 z-20 pointer-events-auto">
                <button 
                  onClick={() => setCurrentCard((prev) => (prev - 1 + TIMELINE_EVENTS.length) % TIMELINE_EVENTS.length)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-400 border border-rose-100/50 hover:bg-white hover:text-gray-600 transition-all active:scale-95"
                  title="Previous Memory"
                >
                  <X size={16} />
                </button>
                <button 
                  onClick={() => {
                    setFavorites(prev => 
                      prev.includes(currentCard) 
                        ? prev.filter(id => id !== currentCard)
                        : [...prev, currentCard]
                    );
                  }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center border border-rose-100/50 transition-all active:scale-95 hover:bg-white ${favorites.includes(currentCard) ? 'text-yellow-500' : 'text-gray-300'}`}
                  title={favorites.includes(currentCard) ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Star size={16} fill={favorites.includes(currentCard) ? "currentColor" : "none"} />
                </button>
                <button 
                  onClick={() => setCurrentCard((prev) => (prev + 1) % TIMELINE_EVENTS.length)}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-xl shadow-rose-300/50 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
                  title="Next Memory"
                >
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'letter' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full py-4 pb-2 w-full"
          >
             <div className="text-center mb-4 shrink-0">
                <h3 className="font-serif text-2xl font-bold text-rose-600 mb-1 leading-tight">Anniversary Letter for my Heart ❤️</h3>
                <p className="text-rose-400 italic text-sm">(Click the arrows to flip the pages!)</p>
             </div>
             
             <div className="flex-1 min-h-0 relative w-full">
               <SpiralNotebook />
             </div>

             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="mt-6 flex justify-center shrink-0"
             >
                <div className="bg-white/60 backdrop-blur-md p-3 px-6 rounded-full border-2 border-white shadow-sm flex items-center gap-3 max-w-xs mx-auto">
                  <span className="text-rose-500">
                    <Heart size={18} fill="currentColor" />
                  </span>
                  <p className="text-xs text-rose-800 font-serif italic font-semibold leading-tight">
                    "Every single page holds a piece of my heart... just for you."
                  </p>
                </div>
             </motion.div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <div className="py-2 flex flex-col items-center w-full h-full relative overflow-y-auto overflow-x-hidden custom-scrollbar">
            {proposalStatus !== 'accepted' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full min-h-full flex flex-col justify-center items-center relative py-6"
              >
                {/* Immersive Background for the 'Stage' */}
                <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-rose-50/50 to-transparent rounded-[3rem] -z-10" />

                {/* The Cat - Talking Tom Style */}
                <div className="relative mb-6 group cursor-pointer mt-2 flex flex-col items-center">
                  
                  {/* Speech Bubble - Modern & Dynamic */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    key={catDialogue}
                    className="bg-white p-3 py-2 rounded-2xl shadow-xl border-2 border-rose-100 max-w-[180px] z-30 text-center mb-3 relative"
                  >
                    <p className="text-xs font-bold text-gray-800 leading-[1.3] italic">
                      "{catDialogue}"
                    </p>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-rose-100 rotate-45 z-[-1]" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, -4, 0],
                      scaleX: [1, 1.02, 1],
                      scaleY: [1, 0.98, 1],
                      rotate: noClicks > 0 ? [0, 5, -5, 0] : [0, 2, -2, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-40 h-40 sm:w-44 sm:h-44 relative"
                  >
                    {/* Shadow underneath */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black/5 blur-2xl rounded-full" />
                    
                    {/* High quality 3D-style Ginger Cat (User's cat.png) */}
                    <img 
                      src="https://i.postimg.cc/Z59t78Fd/cat.png" 
                      className={`w-full h-full object-contain filter drop-shadow-2xl transition-all duration-300 ${noClicks > 0 ? 'scale-110 rotate-3' : 'hover:scale-105'}`}
                      alt="The Proposal Cat"
                    />

                    {/* Animated Rose - Placed in the Cat's hand (Top Left Paw) */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-2 left-0 text-4xl drop-shadow-lg z-20"
                    >
                      🌹
                    </motion.div>
                  </motion.div>

                  {/* Talking Tom 'Mic' Icon Indicator */}
                  <div className="absolute -left-10 sm:-left-12 top-[60%] sm:top-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-8 h-8 rounded-full bg-rose-400 flex items-center justify-center text-white"
                    >
                      <Heart size={14} fill="currentColor" />
                    </motion.div>
                  </div>
                </div>

                <div className="text-center mb-4 px-6">
                  <h2 className="text-2xl font-bold font-serif text-gray-800 mb-0.5 tracking-tight">The Big Question</h2>
                  <p className="text-rose-400 font-medium text-[10px] italic leading-none">Wait for it... he's really nervous! 🤭</p>
                </div>

                {/* Interactive Buttons */}
                <div className="w-full space-y-3 px-6 relative pb-4 flex flex-col items-center max-w-[260px]">
                  {/* Fixed Glowing YES Button - Always stays in center */}
                  <motion.button
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 15px rgba(244, 63, 94, 0.3)",
                        "0 0 30px rgba(244, 63, 94, 0.5)",
                        "0 0 15px rgba(244, 63, 94, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYesClick}
                    className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 bg-[length:200%_auto] text-white rounded-[2rem] font-bold text-xl shadow-xl border-[3px] border-white transform-gpu relative overflow-hidden z-50 animate-gradient"
                  >
                    <span className="relative z-10 drop-shadow-lg">YES, I DO! 💍</span>
                    <motion.div 
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.button>
 
                  {/* Jumping NO Button - Only this one moves */}
                  <motion.div
                    animate={{ 
                      x: noClicks > 0 ? noBtnPos.x : 0, 
                      y: noClicks > 0 ? noBtnPos.y : 0,
                      rotate: noClicks > 0 ? noBtnPos.rotate : 0
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="w-full"
                  >
                    <motion.button
                      animate={{ scale: noBtnScale }}
                      onMouseEnter={handleNoClick}
                      onClick={handleNoClick}
                      className="w-full py-3 bg-white/40 backdrop-blur-xl text-rose-300 rounded-[2rem] font-bold text-sm border-2 border-dashed border-rose-100 shadow-lg flex items-center justify-center gap-1"
                    >
                      No... <span className="text-[10px] opacity-60">Wait!</span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center px-4 pb-24 pt-8 flex flex-col items-center w-full my-auto"
              >
                {/* Confetti / Celebration Header */}
                <div className="mt-8 mb-2 flex justify-center gap-4 shrink-0 z-10 relative">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                    <div className="text-4xl sm:text-5xl drop-shadow-md">✨</div>
                  </motion.div>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <div className="text-5xl sm:text-6xl drop-shadow-lg">💖</div>
                  </motion.div>
                  <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                    <div className="text-4xl sm:text-5xl drop-shadow-md">✨</div>
                  </motion.div>
                </div>

                <div className="flex flex-col items-center shrink-0 mb-2 relative z-50 mt-2">
                  {/* Celebration Speech Bubble - Fixed Visibility */}
                  <div className="bg-white px-6 py-3 rounded-3xl shadow-xl border-2 border-rose-200 z-[60] text-center relative mb-4 transform transition-all duration-500 scale-100 hover:scale-105">
                    <p className="text-rose-600 font-bold italic text-sm">
                      {noClicks === 0 
                        ? "Come in my arms, munuu ❤️" 
                        : noClicks < 3 
                          ? "Finally! Now come in my arms, munuu ❤️" 
                          : "Akhir YES hi bolna tha! Come in my arms, munuu ❤️"}
                    </p>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-rose-200 -rotate-45 z-[-1]" />
                  </div>

                  <div className="w-48 h-48 sm:w-56 sm:h-56 relative group translate-y-6 z-40">
                    <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    
                    {/* New Celebration Cat Image */}
                    <img 
                      src="https://i.postimg.cc/TwXHjS9x/vecteezy-adorable-orange-tabby-cat-sleeping-on-its-back-paws-up-69729063.png" 
                      className="w-full h-full object-contain filter drop-shadow-2xl relative z-10"
                      alt="Happy Celebration Cat"
                    />
                  </div>
                </div>

                <h2 className="text-3xl font-bold font-serif text-rose-600 mb-4 drop-shadow-sm leading-tight shrink-0">YAYY! SHE SAID YES! 🐾💖</h2>
                
                <div className="shrink-0 glass p-6 pt-5 rounded-[2rem] border-2 border-white shadow-xl mb-6 relative w-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-rose-100/50 rounded-full blur-xl" />
                  <p className="text-gray-700 text-base leading-relaxed font-medium relative z-10 italic">
                    "My darling, this is the start of our forever. I promise to hold your hand, share your laughs, and love you more with every single heartbeat. Golu Molu Cat is now our official witness!"
                  </p>
                  <p className="mt-4 text-rose-600 font-bold font-serif text-lg relative z-10">— Forever Yours, Jyotimoy ❤️</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setProposalStatus('idle')}
                  className="px-8 py-3 bg-rose-50 text-rose-500 rounded-2xl font-bold text-base hover:bg-rose-100 transition-colors shrink-0 mx-auto"
                >
                  Relive the Moment ✨
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </main>

      {/* Match Celebration (Inspired by Match screen in image) */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6 text-center"
          >
            <div className="bg-circles opacity-20" />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative flex justify-center items-center mb-12"
            >
              <div className="w-28 h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl -rotate-12 translate-x-4">
                 <img src={TIMELINE_EVENTS[0].image} className="w-full h-full object-cover" />
              </div>
              <div className="w-28 h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl rotate-12 -translate-x-4">
                 <img src={TIMELINE_EVENTS[TIMELINE_EVENTS.length-1].image} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 bg-rose-500 p-3 rounded-2xl shadow-xl z-20">
                 <Heart size={24} className="text-white fill-current" />
              </div>
            </motion.div>

            <h2 className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-4">Congratulations!</h2>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 leading-tight">It's a Forever Match!!</h1>
            <p className="text-gray-500 mb-12 max-w-xs mx-auto">Start our lifetime conversation now with each other.</p>

            <div className="w-full max-w-sm flex flex-col gap-4">
              <button 
                onClick={() => setShowMatch(false)}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-rose-200"
              >
                Say hello
              </button>
              <button 
                onClick={() => setShowMatch(false)}
                className="w-full py-4 bg-rose-50 text-rose-500 rounded-2xl font-bold text-lg"
              >
                Keep loving
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation - Minimal & frameless like header */}
      <nav className="fixed bottom-2 left-0 right-0 z-50 px-8 flex justify-center pointer-events-none">
        <div className="flex items-center gap-5 sm:gap-6 pointer-events-auto">
          <NavButton active={activeTab === 'discover'} icon={Home} label="Home" onClick={() => setActiveTab('discover')} />
          <NavButton active={activeTab === 'letter'} icon={MessageCircle} label="Letter" onClick={() => setActiveTab('letter')} />
          <NavButton active={activeTab === 'profile'} icon={Ring} label="Proposal" onClick={() => setActiveTab('profile')} />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ active, icon: Icon, onClick, label }: { active: boolean, icon: any, onClick: () => void, label: string }) {
  const [showLabel, setShowLabel] = useState(false);
  const timeoutRef = useRef<any>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (active) {
      if (isMounted.current) {
        setShowLabel(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setShowLabel(false), 2000);
      }
    } else {
      setShowLabel(false);
    }
    isMounted.current = true;
  }, [active]);

  const handleClick = () => {
    onClick();
    setShowLabel(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowLabel(false), 2000);
  };

  return (
    <button 
      onClick={handleClick}
      className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-500 ${
        active 
          ? 'bg-rose-500 shadow-[0_8px_24px_rgba(244,63,94,0.3)] text-white' 
          : 'bg-white/30 backdrop-blur-md text-rose-400 border border-white/40 hover:bg-white/50'
      }`}
    >
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      
      <AnimatePresence>
        {showLabel && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-12 bg-white/40 backdrop-blur-md text-rose-600 shadow-[0_4px_12px_rgba(255,182,193,0.1)] border border-white/60 text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-full pointer-events-none whitespace-nowrap"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function TimeUnit({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[14px] sm:min-w-[16px]">
      <motion.span 
        key={value}
        initial={{ scale: 1.2, color: '#f43f5e' }}
        animate={{ scale: 1, color: '#1f2937' }}
        className="text-[10px] sm:text-[11px] font-bold tabular-nums leading-none"
      >
        {value}
      </motion.span>
      <span className="text-[5px] sm:text-[6px] text-rose-500/90 uppercase font-extrabold tracking-widest mt-[2px]">{label}</span>
    </div>
  );
}

function FloatingHearts() {
  const [elements, setElements] = useState<{ 
    id: number; 
    x: number; 
    size: number; 
    delay: number; 
    duration: number; 
    type: 'heart' | 'note' | 'photo'; 
    text?: string; 
    image?: string; 
    rotate: number 
  }[]>([]);

  useEffect(() => {
    const LOVE_NOTES = [
      "You're my world", "Forever", "My Love", "Always you", 
      "Soulmate", "Our story", "Together", "❤️", "I'm yours", "Pure Love"
    ];

    const hearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 20,
      delay: Math.random() * 15,
      duration: 25 + Math.random() * 10,
      type: 'heart' as const,
      rotate: Math.random() * 360
    }));

    const notes = Array.from({ length: 12 }).map((_, i) => ({
      id: i + 100,
      x: Math.random() * 95,
      size: 0,
      delay: Math.random() * 20,
      duration: 30 + Math.random() * 10,
      type: 'note' as const,
      text: LOVE_NOTES[i % LOVE_NOTES.length],
      rotate: Math.random() * 15 - 7
    }));

    const photos = TIMELINE_EVENTS.map((event, i) => ({
      id: i + 200,
      x: Math.random() * 85,
      size: 110,
      delay: Math.random() * 10,
      duration: 40 + Math.random() * 20,
      type: 'photo' as const,
      image: event.image,
      rotate: Math.random() * 40 - 20
    }));

    setElements([...hearts, ...notes, ...photos]);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute flex items-center justify-center pointer-events-none"
          style={{ 
            left: `${el.x}%`,
            width: el.type === 'photo' ? 110 : 'auto',
            top: '110%' 
          }}
          initial={{ y: 0, opacity: 0, rotate: el.rotate }}
          animate={{ 
            y: '-130vh', 
            opacity: [0, 0.5, 0.5, 0],
            rotate: el.type === 'photo' ? el.rotate + 10 : el.type === 'heart' ? el.rotate + 360 : el.rotate
          }}
          transition={{ 
            duration: el.duration, 
            repeat: Infinity, 
            delay: el.delay,
            ease: "linear"
          }}
        >
          {el.type === 'heart' ? (
            <div className="text-rose-400/40">
              <Heart size={el.size} fill="currentColor" />
            </div>
          ) : el.type === 'note' ? (
            <div className="text-rose-500/40 font-cursive text-3xl whitespace-nowrap drop-shadow-sm">
              {el.text}
            </div>
          ) : (
            <div className="w-28 h-36 rounded-xl overflow-hidden border-4 border-white shadow-2xl bg-white p-1 grayscale opacity-30">
              <img src={el.image} className="w-full h-full object-cover rounded-lg" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
