"use client";
import { useState, useEffect } from "react";

interface FloatingHeartsProps {
  count?: number;
  className?: string;
}

export function FloatingHearts({ count = 12, className = "" }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<Array<{
    id: number; left: string; duration: string; delay: string; size: string; emoji: string;
  }>>([]);

  useEffect(() => {
    const emojis = ["❤️", "🩷", "💕", "✨", "💫"];
    setHearts(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${6 + Math.random() * 8}s`,
        delay: `${Math.random() * 8}s`,
        size: `${14 + Math.random() * 18}px`,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }))
    );
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="floating-heart absolute bottom-0 select-none"
          style={{
            left: h.left,
            fontSize: h.size,
            ["--duration" as string]: h.duration,
            ["--delay" as string]: h.delay,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}
