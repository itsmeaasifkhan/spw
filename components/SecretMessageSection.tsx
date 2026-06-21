"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface SecretMessageProps {
  specialQuote: string;
  girlfriendName: string;
}

export function SecretMessageSection({ specialQuote, girlfriendName }: SecretMessageProps) {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = useCallback(async () => {
    if (unlocked) return;
    setUnlocked(true);

    // Confetti burst
    if (typeof window !== "undefined") {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#e11d48", "#c084fc", "#fda4af", "#f9a8d4", "#e879f9"],
        startVelocity: 40,
      });
    }
  }, [unlocked]);

  return (
    <section className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #13091e 0%, #0d0714 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-purple-300/70 text-lg mb-3">just for you</p>
          <h2 className="font-display font-light text-white text-5xl md:text-6xl text-glow-plum mb-6">
            A Secret
          </h2>
          <p className="text-purple-200/50 font-light mb-14">
            {unlocked ? "Now you know." : `Unlock what only ${girlfriendName} gets to read.`}
          </p>
        </motion.div>

        {/* Lock / Heart button */}
        <div className="flex flex-col items-center gap-8">
          <motion.button
            onClick={handleUnlock}
            whileHover={!unlocked ? { scale: 1.1 } : {}}
            whileTap={!unlocked ? { scale: 0.95 } : {}}
            className="relative cursor-pointer group"
            disabled={unlocked}
          >
            <AnimatePresence mode="wait">
              {!unlocked ? (
                <motion.div
                  key="locked"
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-8xl"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  // @ts-ignore
                  style={{ animationDuration: "3s", animationIterationCount: "infinite" }}
                >
                  🔒
                </motion.div>
              ) : (
                <motion.div
                  key="unlocked"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="text-8xl heartbeat"
                >
                  💝
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sparkles around lock */}
            {!unlocked && (
              <div className="absolute inset-0 pointer-events-none">
                {["✨", "💫", "⭐"].map((s, i) => (
                  <span
                    key={i}
                    className="absolute text-sm sparkle opacity-60"
                    style={{
                      top: `${[20, 80, 50][i]}%`,
                      left: `${[120, 110, -30][i]}%`,
                      ["--dur" as string]: `${1.2 + i * 0.4}s`,
                      ["--del" as string]: `${i * 0.3}s`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </motion.button>

          {!unlocked && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-rose-300/60 text-sm tracking-widest uppercase"
            >
              tap to unlock
            </motion.p>
          )}
        </div>

        {/* Revealed message */}
        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 glass-card p-8 md:p-12"
              style={{ boxShadow: "0 20px 60px rgba(192,132,252,0.2), 0 0 40px rgba(225,29,72,0.1)" }}
            >
              <div className="flex justify-center gap-2 mb-6">
                {["✨", "💫", "✨"].map((s, i) => (
                  <span key={i} className="sparkle text-lg" style={{ ["--dur" as string]: "1.5s", ["--del" as string]: `${i * 0.2}s` }}>{s}</span>
                ))}
              </div>
              <p className="font-display italic text-white/90 text-xl md:text-2xl leading-relaxed">
                {specialQuote}
              </p>
              <div className="mt-6 flex justify-center">
                <span className="font-script text-rose-300 text-2xl">— with everything I have</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
