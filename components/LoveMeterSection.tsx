"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function LoveMeterSection() {
  const [value, setValue] = useState(50);
  const [touched, setTouched] = useState(false);

  const reactions = [
    "Moving the slider won't help…",
    "Still infinite ✨",
    "Can't measure this one 💫",
    "The scale goes: you → infinity 🌌",
  ];

  const [reactionIdx, setReactionIdx] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    if (!touched) {
      setTouched(true);
    }
    setReactionIdx(Math.floor(Math.random() * reactions.length));
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0714 0%, #1a0a2e 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-rose-300/70 text-lg mb-3">an impossible question</p>
          <h2 className="font-display font-light text-white text-4xl md:text-5xl text-glow-rose mb-6">
            How Much Do I Love You?
          </h2>
          <p className="text-purple-200/50 font-light mb-14">Drag the slider to find out.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-10"
        >
          {/* Slider labels */}
          <div className="flex justify-between text-xs text-white/30 mb-4 font-light tracking-wider uppercase">
            <span>A little</span>
            <span>Infinite</span>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={handleChange}
            className="w-full cursor-pointer"
          />

          {/* Result */}
          <AnimatePresence mode="wait">
            <motion.div
              key={touched ? reactionIdx : "default"}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-10"
            >
              <div className="text-6xl mb-4">
                <span className="heartbeat inline-block">❤️</span>
              </div>
              <p className="font-display text-2xl md:text-3xl text-white/90 font-light">
                {touched ? reactions[reactionIdx] : "Not enough to measure ❤️"}
              </p>
              {touched && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-rose-300/60 font-script text-lg"
                >
                  Not enough to measure ❤️
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Sparkles */}
          <div className="relative h-8 mt-6">
            {["✨", "💫", "⭐", "✨", "💫"].map((s, i) => (
              <span
                key={i}
                className="sparkle absolute text-sm"
                style={{
                  left: `${10 + i * 20}%`,
                  top: 0,
                  ["--dur" as string]: `${1 + i * 0.3}s`,
                  ["--del" as string]: `${i * 0.2}s`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
