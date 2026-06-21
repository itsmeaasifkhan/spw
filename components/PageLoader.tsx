"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0d0714]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl mb-6"
          >
            ❤️
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-script text-2xl text-rose-300"
          >
            A love story begins…
          </motion.p>
          <motion.div
            className="mt-8 w-32 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
