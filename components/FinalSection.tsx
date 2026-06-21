"use client";
import { motion } from "framer-motion";
import { StarField } from "./StarField";
import { FloatingHearts } from "./FloatingHearts";

interface FinalSectionProps {
  girlfriendName: string;
  specialQuote: string;
}

export function FinalSection({ girlfriendName, specialQuote }: FinalSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0714 0%, #1a0829 40%, #0d0714 100%)" }}
    >
      <StarField count={120} />
      <FloatingHearts count={20} />

      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-rose-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Main glowing heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-8xl md:text-9xl mb-12 heartbeat inline-block"
          style={{ filter: "drop-shadow(0 0 40px rgba(225,29,72,0.7)) drop-shadow(0 0 80px rgba(225,29,72,0.3))" }}
        >
          ❤️
        </motion.div>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="font-display font-light text-white/70 text-xl md:text-2xl italic mb-4"
        >
          Every day with you is my favorite day.
        </motion.p>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-script text-rose-300 text-glow-rose mb-8"
          style={{ fontSize: "clamp(3.5rem, 12vw, 7rem)" }}
        >
          {girlfriendName}
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-24 h-px mx-auto mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(225,29,72,0.7), transparent)" }}
        />

        {/* Special quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.9 }}
          className="font-display italic text-purple-200/70 text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
        >
          {specialQuote}
        </motion.p>

        {/* Footer signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <div className="w-8 h-px bg-rose-400/30" />
          <p className="text-white/20 text-xs tracking-widest uppercase font-light">
            made with love, always
          </p>
        </motion.div>
      </div>
    </section>
  );
}
