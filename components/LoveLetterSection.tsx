"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LoveLetterProps {
  letter: string;
  girlfriendName: string;
}

export function LoveLetterSection({ letter, girlfriendName }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const paragraphs = letter.split("\n\n").filter(Boolean);

  return (
    <section id="love-letter" className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0714 0%, #130920 100%)" }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-script text-rose-300/70 text-lg mb-3">written from the heart</p>
          <h2 className="font-display font-light text-white text-5xl md:text-6xl text-glow-rose">
            A Letter for You
          </h2>
        </motion.div>

        {/* Envelope / letter container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          {!isOpen ? (
            /* Sealed envelope */
            <motion.div
              className="paper-texture rounded-3xl p-10 cursor-pointer shadow-2xl relative overflow-hidden"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(225,29,72,0.1)" }}
              whileHover={{ y: -6, boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(225,29,72,0.2)" }}
              onClick={() => setIsOpen(true)}
            >
              {/* Wax seal effect */}
              <div className="flex flex-col items-center justify-center py-16 gap-6">
                <motion.div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
                  style={{ background: "linear-gradient(135deg, #9f1239, #7e22ce)", boxShadow: "0 0 30px rgba(159,18,57,0.5)" }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  💌
                </motion.div>
                <p className="font-display italic text-[#5c3317] text-2xl">For {girlfriendName}</p>
                <p className="text-[#8b6347] text-sm tracking-wider">— click to open —</p>
              </div>

              {/* Paper lines decoration */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute w-full h-px left-0 opacity-10"
                  style={{ top: `${20 + i * 14}%`, background: "#8b6347" }} />
              ))}
            </motion.div>
          ) : (
            /* Open letter */
            <motion.div
              initial={{ opacity: 0, scaleY: 0.1, y: -20 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="paper-texture rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(225,29,72,0.15)", transformOrigin: "top" }}
            >
              {/* Paper lines */}
              {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute w-full h-px left-0 opacity-5"
                  style={{ top: `${i * 5 + 2}%`, background: "#8b6347" }} />
              ))}

              <div className="relative z-10">
                {/* Letter header */}
                <div className="text-center mb-8 border-b border-[#d4a88030] pb-6">
                  <p className="font-script text-[#9f1239] text-3xl mb-1">My dearest {girlfriendName},</p>
                </div>

                {/* Letter body */}
                <div className="space-y-5">
                  {paragraphs.slice(1, -2).map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="font-display text-[#3d1f0f] leading-[1.9] text-lg"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Closing */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 pt-6 border-t border-[#d4a88030] text-right"
                >
                  <p className="font-display text-[#5c3317] text-lg">All of my heart, always —</p>
                  <p className="font-script text-[#9f1239] text-3xl mt-2">{paragraphs[paragraphs.length - 1]}</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
