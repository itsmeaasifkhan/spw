"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CounterProps {
  startDate: string;
  girlfriendName: string;
}

function getTimeElapsed(startDate: string) {
  const start = new Date(startDate).getTime();
  const now = Date.now();
  const diff = now - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function CountUnit({ value, label }: { value: number; label: string }) {
  const [prev, setPrev] = useState(value);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (value !== prev) {
      setKey(k => k + 1);
      setPrev(value);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="glass-card w-24 h-24 md:w-32 md:h-32 flex items-center justify-center overflow-hidden relative"
        style={{ boxShadow: "0 0 30px rgba(225,29,72,0.15)" }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={key}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-display text-3xl md:text-4xl text-white font-light absolute"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="text-rose-300/60 text-xs tracking-widest uppercase font-light">{label}</p>
    </div>
  );
}

export function RelationshipCounter({ startDate, girlfriendName }: CounterProps) {
  const [time, setTime] = useState(() => getTimeElapsed(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeElapsed(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <section className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0714 0%, #13091e 100%)" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-rose-300/70 text-lg mb-3">every second counts</p>
          <h2 className="font-display font-light text-white text-5xl md:text-6xl text-glow-rose mb-16">
            Time With You
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 md:gap-8 flex-wrap"
        >
          <CountUnit value={time.days} label="Days" />
          <div className="text-rose-400/40 text-4xl font-display mb-6">:</div>
          <CountUnit value={time.hours} label="Hours" />
          <div className="text-rose-400/40 text-4xl font-display mb-6">:</div>
          <CountUnit value={time.minutes} label="Minutes" />
          <div className="text-rose-400/40 text-4xl font-display mb-6">:</div>
          <CountUnit value={time.seconds} label="Seconds" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 font-display italic text-purple-200/50 text-xl"
        >
          and every one of them has been a gift, {girlfriendName}.
        </motion.p>
      </div>
    </section>
  );
}
