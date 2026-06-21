"use client";
import { motion } from "framer-motion";
import { FloatingHearts } from "./FloatingHearts";
import { StarField } from "./StarField";

interface HeroProps {
  girlfriendName: string;
  romanticMessages: string[];
}

export function HeroSection({ girlfriendName, romanticMessages }: HeroProps) {
  const scrollToNext = () => {
    document.getElementById("love-letter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-romantic-hero overflow-hidden">
      <StarField count={100} />
      <FloatingHearts count={14} />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-900/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-rose-900/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Pre-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="font-script text-rose-300/80 text-xl md:text-2xl mb-6 tracking-wide"
        >
          a letter written in starlight
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1, ease: "easeOut" }}
          className="font-display font-light text-glow-rose text-white leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          To My Love,{" "}
          <span className="italic text-rose-300">
            {girlfriendName}
          </span>
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.4, duration: 1, ease: "easeOut" }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent my-8"
        />

        {/* Romantic message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 0.9 }}
          className="font-display text-purple-100/80 text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed max-w-2xl"
        >
          {romanticMessages[0]}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.8 }}
          onClick={scrollToNext}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(225,29,72,0.5)" }}
          whileTap={{ scale: 0.97 }}
          className="mt-14 px-10 py-4 rounded-full font-light tracking-widest text-sm uppercase text-white cursor-pointer relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(225,29,72,0.3), rgba(126,34,206,0.3))",
            border: "1px solid rgba(225,29,72,0.4)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span className="relative z-10">Begin Our Story</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, rgba(225,29,72,0.2), rgba(126,34,206,0.2))" }}
          />
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <p className="text-white/30 text-xs tracking-widest uppercase">scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
