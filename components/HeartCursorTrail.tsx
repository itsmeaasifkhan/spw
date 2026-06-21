"use client";
import { useEffect, useRef } from "react";

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  el: HTMLDivElement;
}

export function HeartCursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hearts = ["❤️", "🩷", "💕", "✨", "💫"];

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime.current < 80) return;
      lastTime.current = now;

      const heart = document.createElement("div");
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.cssText = `
        position: fixed;
        left: ${e.clientX - 8}px;
        top: ${e.clientY - 8}px;
        font-size: ${12 + Math.random() * 10}px;
        pointer-events: none;
        user-select: none;
        z-index: 9997;
        transition: all 0.8s ease-out;
        opacity: 1;
      `;
      container.appendChild(heart);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          heart.style.transform = `translateY(-${30 + Math.random() * 30}px) translateX(${(Math.random() - 0.5) * 30}px) scale(0.3)`;
          heart.style.opacity = "0";
        });
      });

      setTimeout(() => {
        heart.remove();
      }, 900);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9997]" />;
}
