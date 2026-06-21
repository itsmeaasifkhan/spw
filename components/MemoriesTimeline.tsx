"use client";
import { motion } from "framer-motion";

interface Memory {
  emoji: string;
  title: string;
  description: string;
  date: string;
}

interface TimelineProps {
  memories: Memory[];
}

export function MemoriesTimeline({ memories }: TimelineProps) {
  return (
    <section className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0714 0%, #130920 50%, #0d0714 100%)" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-900/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-script text-rose-300/70 text-lg mb-3">the moments that made us</p>
          <h2 className="font-display font-light text-white text-5xl md:text-6xl text-glow-rose">
            Our Memories
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: "linear-gradient(180deg, transparent, rgba(225,29,72,0.4) 15%, rgba(192,132,252,0.5) 50%, rgba(225,29,72,0.4) 85%, transparent)" }}
          />

          <div className="space-y-16">
            {memories.map((memory, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row pl-16 md:pl-0`}
              >
                {/* Content */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-6 group cursor-default"
                    style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{memory.emoji}</span>
                      <div>
                        <h3 className="font-display text-white/90 text-xl font-medium">{memory.title}</h3>
                        <p className="text-rose-300/60 text-xs tracking-wider">{memory.date}</p>
                      </div>
                    </div>
                    <p className="text-purple-200/65 text-sm leading-relaxed font-light">{memory.description}</p>
                    <div className="mt-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(225,29,72,0.5), transparent)" }}
                    />
                  </motion.div>
                </div>

                {/* Empty space for alternating */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>

          {/* Timeline nodes */}
          {memories.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-[calc(100%+2rem)]"
              style={{
                top: `${(i / memories.length) * 100 + 2}%`,
                background: "linear-gradient(135deg, #e11d48, #c084fc)",
                boxShadow: "0 0 12px rgba(225,29,72,0.7)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
