/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Heart, Coffee, Sparkles, Star, Navigation2, X, User, MessageCircle, Home, Image as ImageIcon, Send, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

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
    date: "August 12, 2025",
    description: "There's a magic in the way you look at me. It's not just love; it's a belief that makes me feel like I can conquer the world.",
    icon: Heart,
    image: "https://i.postimg.cc/658PJ6RX/8e92dce2-7165-4a13-a234-1e8f935dc272.jpg",
    extraImages: ["https://i.postimg.cc/8P7YQkWT/184611a6-ff1a-49bb-8ec4-28975e0093d8.jpg"],
    secretNote: "Trinita, whenever I feel low or lose my way, I just look into your eyes. They are my sanctuary. You don't realize how much strength you give me just by being you. Your gaze is like a silent promise that everything will be okay. It's because of you that I've found the confidence to be the man I am today. You are my power, my anchor, and my greatest motivation. I love you, Munuu. ❤️"
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
    title: "Me Annoying You 😜",
    date: "December 23, 2025",
    description: "They say if you don't annoy your partner, are you even in love? These moments are some of my favorites because even when you're mad at me, you're the most adorable person on Earth.",
    icon: Heart,
    image: "https://i.postimg.cc/vmy6SfZp/Screenshot-2025-12-23-12-28-22-43-8c9f6584ca98fa3eab4829abe86aac46.jpg",
    extraImages: ["https://i.postimg.cc/QMDWn1d2/Screenshot-2025-12-23-12-29-09-19-8c9f6584ca98fa3eab4829abe86aac46.jpg"],
    secretNote: "The only thing I love more than annoying you is loving you. I promise to keep bothering you with my love for the rest of our lives! ❤️😂"
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
    <div className="relative w-full max-w-4xl mx-auto aspect-[3/4] md:aspect-[4/5] group select-none perspective-2000">
      {/* Real-style Spiral Spine (Static - High Detail) */}
      <div className="absolute left-3 top-6 bottom-6 w-6 z-50 pointer-events-none flex flex-col justify-between py-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex items-center -ml-1 relative">
            <div className="w-6 h-1.5 bg-gradient-to-r from-gray-500 via-gray-200 to-gray-600 rounded-full border border-gray-400/20 shadow-sm" />
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
          className="w-full h-full bg-[#fcf9f2] rounded-r-[3rem] rounded-l-md shadow-xl border border-gray-200/50 relative overflow-hidden flex flex-col p-6 pl-12 pr-6 cursor-default"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 40px, rgba(219, 109, 123, 0.1) 40px, rgba(219, 109, 123, 0.1) 42px, transparent 42px),
              linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 1.6em'
          }}
        >
          {/* Subtle Paper Texture */}
          <div className="absolute inset-0 bg-white/40 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
          
          <div className="flex-1 flex flex-col justify-start pt-2 overflow-hidden">
             <p className="font-handwriting text-sm sm:text-base text-gray-800 leading-[1.6em] whitespace-pre-wrap tracking-tight text-justify">
               {LETTER_PAGES[page]}
             </p>
          </div>

          {/* Page Depth / Curvature Shadow */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/[0.05] to-transparent pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/[0.08] to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Stacked Pages depth */}
      <div className="absolute -right-2 top-2 bottom-2 w-full h-full bg-white/95 -z-10 rounded-r-[3rem] border-r border-gray-300 shadow-sm" />
      <div className="absolute -right-4 top-4 bottom-4 w-full h-full bg-[#f8f8f8] -z-20 rounded-r-[3rem] border-r border-gray-200 shadow-md" />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [subImageIndex, setSubImageIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const [arrowAngle, setArrowAngle] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCelebration, setIsCelebration] = useState(false);
  const celebrationTriggered = useRef(false);

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

  // Anniversary Logic: May 13, 2025, 07:45 AM
  useEffect(() => {
    const startDate = new Date('2025-05-13T07:45:00');
    
    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      // Check for 1 Year Anniversary Celebration (May 13, 2026, 07:45 AM)
      // Note: Month is 4 (May), Hour 7, Minute 45
      const isAnniversaryDay = now.getMonth() === 4 && now.getDate() === 13 && now.getFullYear() === 2026;
      const isAnniversaryMinute = isAnniversaryDay && now.getHours() === 7 && now.getMinutes() === 45;

      if (isAnniversaryMinute && !celebrationTriggered.current) {
        setIsCelebration(true);
        celebrationTriggered.current = true;
        
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
      } else if (!isAnniversaryMinute && celebrationTriggered.current) {
        setIsCelebration(false);
        celebrationTriggered.current = false;
      }

      let seconds = Math.floor(diff / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      // Simple calculation for years and months (approximate)
      const years = Math.floor(days / 365);
      days %= 365;
      const months = Math.floor(days / 30);
      days %= 30;
      hours %= 24;
      minutes %= 60;
      seconds %= 60;

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
    <div className="h-[100dvh] w-full bg-[#fdf2f2] font-sans text-gray-900 selection:bg-rose-200 overflow-hidden relative flex flex-col">
      <FloatingHearts />
      
      {/* Fixed Header */}
      <header className="w-full px-4 py-4 z-50 shrink-0">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(255,182,193,0.1)] rounded-[2rem] px-5 py-3 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-200">
              <Heart size={18} className="text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-gray-800 leading-tight">Jyotimoy & Trinita</h1>
              <p className="text-[9px] text-rose-400 font-medium tracking-[0.15em] uppercase">365 Days of Forever</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-rose-50 px-3 py-1 rounded-full border border-rose-100"
          >
            <span className="text-rose-500 text-[10px] font-bold tracking-wider">ANNIVERSARY</span>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative overflow-hidden px-4">
        
        {activeTab === 'discover' && (
          <div className="h-full flex flex-col justify-between py-2 pb-20">
            {/* Card Stack */}
            <div className="flex-1 flex items-center justify-center relative min-h-0 py-4">
              <div className="relative w-full max-w-[320px] aspect-[3/4] sm:max-w-[360px]">
                <AnimatePresence mode="popLayout">
                  {TIMELINE_EVENTS.map((event, i) => (
                    i === currentCard && (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
                        exit={{ x: 300, opacity: 0, rotate: 10 }}
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="absolute inset-0 z-10 cursor-pointer"
                      >
                        <div className="h-full w-full rounded-[2.5rem] overflow-hidden card-shadow relative bg-white border-4 border-white">
                          <AnimatePresence>
                            {isFlipped && event.secretNote && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-rose-500/95 backdrop-blur-md flex items-center justify-center p-8 text-center"
                              >
                                 <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
                                    <Heart size={32} className="text-white fill-current mx-auto mb-4" />
                                    <p className="font-cursive text-xl text-white leading-relaxed">"{event.secretNote}"</p>
                                 </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="relative w-full h-full overflow-hidden">
                            <motion.img 
                              animate={{ scale: [1, 1.1, 1] }} 
                              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                              src={event.image} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-40 text-left">
                              <h2 className="text-2xl font-bold mb-1 font-serif line-clamp-1">{event.title}</h2>
                              <p className="text-[11px] text-gray-200 mb-3 line-clamp-2">{event.description}</p>
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center">
                                  <event.icon size={10} className="text-white" />
                                </span>
                                <span className="text-[10px] opacity-70 font-medium">{event.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>

                <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
                  <button onClick={() => setCurrentCard((prev) => (prev - 1 + TIMELINE_EVENTS.length) % TIMELINE_EVENTS.length)} className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 border border-gray-100">
                    <X size={18} />
                  </button>
                  <button onClick={() => setCurrentCard((prev) => (prev + 1) % TIMELINE_EVENTS.length)} className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-xl flex items-center justify-center text-white">
                    <Heart size={26} fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pb-4">
               <motion.div animate={{ opacity: 1 }} className="mx-auto w-fit glass px-5 py-3 rounded-2xl border border-white/50 shadow-sm">
                  <div className="flex items-center gap-3">
                     <TimeUnit value={timeElapsed.years} label="Yrs" />
                     <TimeUnit value={timeElapsed.months} label="Mts" />
                     <TimeUnit value={timeElapsed.days} label="Dys" />
                     <div className="w-px h-5 bg-rose-100" />
                     <TimeUnit value={timeElapsed.hours} label="Hrs" />
                     <TimeUnit value={timeElapsed.minutes} label="Min" />
                     <TimeUnit value={timeElapsed.seconds} label="Sec" />
                  </div>
               </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'letter' && (
          <div className="h-full flex flex-col justify-center items-center py-2 pb-24">
             <div className="text-center mb-4 shrink-0">
                <h3 className="font-serif text-xl font-bold text-rose-600">Anniversary Letter ❤️</h3>
             </div>
             <div className="w-full max-w-[320px] flex-1 min-h-0 flex items-center justify-center">
                <SpiralNotebook />
             </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="h-full flex flex-col justify-center items-center py-2 pb-24 px-4 overflow-hidden">
            {proposalStatus !== 'accepted' ? (
              <div className="w-full flex flex-col items-center">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold font-serif text-gray-800">The Big Question</h2>
                </div>
                <div className="relative mb-6 pt-2">
                  <div className="w-48 h-48 relative">
                    <img src="https://i.postimg.cc/Z59t78Fd/cat.png" className="w-full h-full object-contain filter drop-shadow-xl" alt="Cat" />
                  </div>
                  <motion.div key={catDialogue} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-10 -right-2 bg-white p-2 rounded-xl rounded-bl-none shadow-lg border border-rose-100 max-w-[120px] z-30">
                    <p className="text-[9px] font-bold text-gray-800 leading-tight italic">"{catDialogue}"</p>
                  </motion.div>
                </div>
                <div className="w-full max-w-[240px] space-y-3">
                  <button onClick={handleYesClick} className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg">YES, I DO! 💍</button>
                  <motion.button animate={{ x: noClicks > 0 ? noBtnPos.x : 0, y: noClicks > 0 ? noBtnPos.y : 0 }} onMouseEnter={handleNoClick} onClick={handleNoClick} className="w-full py-2.5 bg-white/40 text-rose-300 rounded-2xl font-bold text-xs border border-dashed border-rose-200">No...</motion.button>
                </div>
              </div>
            ) : (
              <div className="text-center w-full">
                <div className="w-48 h-48 mx-auto mb-4 relative">
                  <img src="https://i.postimg.cc/TwXHjS9x/vecteezy-adorable-orange-tabby-cat-sleeping-on-its-back-paws-up-69729063.png" className="w-full h-full object-contain filter drop-shadow-xl" alt="Yay" />
                </div>
                <h2 className="text-2xl font-bold font-serif text-rose-600 mb-4">SHE SAID YES! 🐾💖</h2>
                <div className="glass p-5 rounded-2xl border border-white shadow-lg mb-6">
                  <p className="text-gray-700 text-[11px] leading-relaxed italic">"My darling, this is the start of our forever. I promise to love you more with every heartbeat."</p>
                </div>
                <button onClick={() => setProposalStatus('idle')} className="px-6 py-2 bg-rose-50 text-rose-500 rounded-xl font-bold text-sm">Relive ✨</button>
              </div>
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

      {/* Floating Bottom Navigation */}
      <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-full px-8 max-w-xs shrink-0">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-xl rounded-[2rem] px-4 py-1.5 flex items-center justify-between">
          <NavButton active={activeTab === 'discover'} icon={Home} label="Home" onClick={() => setActiveTab('discover')} />
          <NavButton active={activeTab === 'letter'} icon={MessageCircle} label="Letter" onClick={() => setActiveTab('letter')} />
          <NavButton active={activeTab === 'profile'} icon={Ring} label="Proposal" onClick={() => setActiveTab('profile')} />
        </div>
      </nav>

      {/* Background Decos */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-20">
         <div className="absolute top-[-5%] right-[-5%] w-[50%] aspect-square bg-rose-200/40 rounded-full blur-[80px]" />
         <div className="absolute bottom-[-5%] left-[-5%] w-[50%] aspect-square bg-pink-200/40 rounded-full blur-[80px]" />
      </div>
    </div>
  );
}

function NavButton({ active, icon: Icon, onClick, label }: { active: boolean, icon: any, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${active ? 'bg-rose-500 shadow-lg shadow-rose-500/40 text-white' : 'text-rose-300 hover:text-rose-500 hover:bg-rose-50'}`}
    >
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      {active && (
        <motion.div 
          layoutId="nav-label"
          className="absolute -top-12 bg-white text-rose-600 shadow-lg border border-rose-100 text-[10px] font-bold px-3 py-1 rounded-lg pointer-events-none whitespace-nowrap"
        >
          {label}
        </motion.div>
      )}
    </button>
  );
}

function TimeUnit({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.span 
        key={value}
        initial={{ scale: 1.2, color: '#f43f5e' }}
        animate={{ scale: 1, color: '#1f2937' }}
        className="text-xl font-bold tabular-nums"
      >
        {value}
      </motion.span>
      <span className="text-[8px] text-rose-400 uppercase font-bold tracking-wider">{label}</span>
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
