"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type EmojiItem = {
  id: number;
  x: number;
  emoji: string;
};

type Bubble = {
  id: number;
  x: number;
  y: number;
};

const fortunes = [
  "Something amazing is coming ✨",
  "Your next coffee will be perfect ☕",
  "A surprise is waiting for you 🎉",
  "You are exactly where you need to be ❤️",
  "Today is a good day to smile 😄",
];

const buttonTexts = [
  "Don't Click Me",
  "Seriously?",
  "Still Clicking?",
  "You Must Be Bored 😏",
  "Okay One More Time",
  "Fine, You Win ❤️",
];


export default function ComingSoonPage() {
  const [mounted, setMounted] = useState(false);

  const [score, setScore] = useState(0);
  const [fortune, setFortune] = useState("");
  const [buttonClick, setButtonClick] = useState(0);

  const [emojis, setEmojis] = useState<EmojiItem[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    setMounted(true);

    const emojiList = ["✨", "🚀", "❤️", "🎉", "🔥", "🌟"];

    const generatedEmojis = Array.from({ length: 15 }, (_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      emoji:
        emojiList[Math.floor(Math.random() * emojiList.length)],
    }));

    setEmojis(generatedEmojis);

    const interval = setInterval(() => {
      setBubbles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 90,
          y: Math.random() * 80,
        },
      ]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const popBubble = (id: number) => {
    setScore((prev) => prev + 1);
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900" />
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      {/* Floating Emojis */}
      {emojis.map((item, index) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl pointer-events-none"
          initial={{
            x: item.x,
            y: window.innerHeight + 100,
          }}
          animate={{
            y: -200,
            rotate: 360,
          }}
          transition={{
            duration: 12 + index,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Bubble Game */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          onClick={() => popBubble(bubble.id)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="absolute cursor-pointer rounded-full border border-white/30 bg-white/20 backdrop-blur-md"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: 60,
            height: 60,
          }}
        />
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold"
        >
          Coming Soon 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 max-w-xl text-white/80 text-lg"
        >
          Something exciting is being built.
          <br />
          While you wait, have some fun.
        </motion.p>

        {/* Score */}
        <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-xl">
          Bubble Score: {score}
        </div>

        {/* Fortune */}
        <div className="mt-10">
          <button
            onClick={() =>
              setFortune(
                fortunes[Math.floor(Math.random() * fortunes.length)]
              )
            }
            className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
          >
            Tell Me Something ✨
          </button>

          {fortune && (
            <motion.p
              key={fortune}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-lg"
            >
              {fortune}
            </motion.p>
          )}
        </div>

        {/* Magic Button */}
        <motion.button
          whileHover={{
            scale: 1.1,
            rotate: buttonClick * 5,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setButtonClick((prev) =>
              Math.min(prev + 1, buttonTexts.length - 1)
            )
          }
          className="mt-10 rounded-full border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-xl"
        >
          {buttonTexts[buttonClick]}
        </motion.button>

        {/* Stress Ball */}
        <motion.div
          drag
          dragElastic={0.8}
          dragMomentum
          whileDrag={{
            scale: 1.3,
          }}
          className="mt-12 h-32 w-32 cursor-grab rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-2xl"
        />

        <p className="mt-3 text-sm text-white/60">
          Drag the stress ball around 😄
        </p>

        {/* Secret Unlock */}
        {score >= 20 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-8 rounded-2xl border border-green-400 bg-green-500/20 px-6 py-4 backdrop-blur-xl"
          >
            🎉 Secret unlocked! Thanks for sticking around.
          </motion.div>
        )}
      </div>
    </main>
  );
}