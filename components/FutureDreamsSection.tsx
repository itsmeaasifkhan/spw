"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Dream {
  emoji: string;
  title: string;
  description: string;
}

interface FutureDreamsProps {
  dreams: Dream[];
}

export function FutureDreamsSection({ dreams }: FutureDreamsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #0d0714 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-800/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-rose-900/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-script text-purple-300/70 text-lg mb-3">everything ahead of us</p>
          <h2 className="font-display font-light text-white text-5xl md:text-6xl text-glow-plum">
            Our Future Dreams
          </h2>
        </motion.div>

        <motion.div style={{ y }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dreams.map((dream, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-7 group cursor-default"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                animation: `float-dream ${3 + i * 0.4}s ease-in-out infinite ${i * 0.3}s`,
              }}
            >
              <div className="text-4xl mb-4">{dream.emoji}</div>
              <h3 className="font-display text-white/90 text-xl font-medium mb-3">{dream.title}</h3>
              <p className="text-purple-200/60 text-sm leading-relaxed font-light">{dream.description}</p>

              <div className="h-px mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.6), transparent)" }}
              />
            </motion.div>
          ))}
        </motion.div>

        <style jsx global>{`
          @keyframes float-dream {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
        `}</style>
      </div>
    </section>
  );
}
