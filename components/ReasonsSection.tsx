"use client";
import { motion } from "framer-motion";

interface Reason {
  icon: string;
  title: string;
  description: string;
}

interface ReasonsProps {
  reasons: Reason[];
  girlfriendName: string;
}

export function ReasonsSection({ reasons, girlfriendName }: ReasonsProps) {
  return (
    <section className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #130920 0%, #0d0714 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-script text-purple-300/70 text-lg mb-3">what I see when I look at you</p>
          <h2 className="font-display font-light text-white text-5xl md:text-6xl text-glow-plum">
            Why I Love You
          </h2>
          <p className="mt-4 text-purple-200/50 font-light text-lg">
            {reasons.length} reasons, and counting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(192,132,252,0.2)",
              }}
              className="glass-card p-6 cursor-default group transition-all duration-300"
            >
              <motion.div
                className="text-4xl mb-4 inline-block"
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {reason.icon}
              </motion.div>

              <div
                className="h-px w-8 mb-4 transition-all duration-300 group-hover:w-full"
                style={{ background: "linear-gradient(90deg, #e11d48, #c084fc)" }}
              />

              <h3 className="font-display text-white/90 text-xl font-medium mb-2">
                {reason.title}
              </h3>
              <p className="text-purple-200/60 text-sm leading-relaxed font-light">
                {reason.description}
              </p>

              {/* Heartbeat on hover */}
              <motion.div
                className="mt-4 text-rose-400/0 group-hover:text-rose-400/60 transition-all duration-300 text-xs"
                whileHover={{ scale: [1, 1.2, 1] }}
              >
                <span className="heartbeat inline-block">♥</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
