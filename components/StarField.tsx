"use client";
import { useState, useEffect } from "react";

interface StarFieldProps {
  count?: number;
}

export function StarField({ count = 80 }: StarFieldProps) {
  const [stars, setStars] = useState<Array<{
    id: number; top: string; left: string; size: string; duration: string; delay: string;
  }>>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${1 + Math.random() * 2}px`,
        duration: `${2 + Math.random() * 4}s`,
        delay: `${Math.random() * 4}s`,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            ["--duration" as string]: s.duration,
            ["--delay" as string]: s.delay,
          }}
        />
      ))}
    </div>
  );
}
