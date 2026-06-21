"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // We generate a subtle ambient tone using the Web Audio API
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  const startAmbient = () => {
    if (ctxRef.current) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Layered soft drone — two detuned oscillators + reverb simulation
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);
    master.connect(ctx.destination);

    const freqs = [220, 277.18, 329.63, 440];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = freq + (Math.random() - 0.5) * 2;

      const gain = ctx.createGain();
      gain.gain.value = 0.015 / (i + 1);

      // Slow LFO for warmth
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.1 + i * 0.05;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.005;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(gain);
      gain.connect(master);
      osc.start();

      nodesRef.current.push(osc, lfo);
    });
  };

  const stopAmbient = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.06, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    setTimeout(() => {
      nodesRef.current.forEach(n => { try { (n as OscillatorNode).stop(); } catch {} });
      nodesRef.current = [];
      ctx.close();
      ctxRef.current = null;
    }, 1600);
  };

  const toggle = () => {
    if (!playing) {
      startAmbient();
      setPlaying(true);
    } else {
      stopAmbient();
      setPlaying(false);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 5, duration: 0.5, type: "spring" }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: "linear-gradient(135deg, rgba(225,29,72,0.25), rgba(126,34,206,0.25))",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: playing ? "0 0 20px rgba(225,29,72,0.4)" : "none",
        transition: "box-shadow 0.3s",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      title={playing ? "Pause music" : "Play ambient music"}
    >
      {playing ? (
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-xl"
        >
          🎵
        </motion.div>
      ) : (
        <span className="text-xl opacity-70">🎵</span>
      )}

      {/* Pulse rings when playing */}
      {playing && (
        <>
          {[1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-rose-400/30"
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </motion.button>
  );
}
