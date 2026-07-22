'use client';

import { useEffect, useState } from 'react';

const wishes: string[] = [
    'Aapka janamdin hansi, pyaar aur khoobsurat yaadon se bhara rahe, aur har pal aapke chehre par muskaan laaye.',
    'Allah aapko hamesha khushiyan, kamiyabi, achi sehat aur zindagi ki har khushi se nawaze.',
    'Aapke saare sapne sach hon,aur apko DamanPreet jaisa husband mile.',
];

const STEP_COUNT = 5;

interface ConfettiPiece {
    id: number;
    left: number;
    delay: number;
    duration: number;
    rotate: number;
    gold: boolean;
}

export default function BirthdayPage() {
    const [step, setStep] = useState<number>(0);
    const [displayText, setDisplayText] = useState<string>('');
    const [candlesLit, setCandlesLit] = useState<boolean>(true);
    const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

    const title = 'Happy Birthday, Sali Ji';

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayText(title.slice(0, index + 1));
            index++;
            if (index === title.length) clearInterval(interval);
        }, 90);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (step === 4) {
            const pieces = Array.from({ length: 32 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 1.4,
                duration: 3.2 + Math.random() * 2.2,
                rotate: Math.random() * 360,
                gold: Math.random() > 0.35,
            }));
            setConfetti(pieces);
        }
    }, [step]);

    const nextStep = () => {
        if (step === 1) setCandlesLit(false);
        setStep((prev) => prev + 1);
    };

    const restart = () => {
        setCandlesLit(true);
        setStep(0);
    };

    return (
        <main className="lux-root">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,600&family=Cormorant+Garamond:ital,wght@0,500;1,500;1,600&family=Jost:wght@400;500;600&display=swap');

        .lux-root {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(212,175,122,0.14), transparent 55%),
            radial-gradient(ellipse at 15% 90%, rgba(92,26,43,0.35), transparent 60%),
            linear-gradient(160deg, #0a0908 0%, #14100d 45%, #0a0908 100%);
          font-family: 'Jost', sans-serif;
          position: relative;
        }

        .lux-root * { box-sizing: border-box; }

        .particle {
          position: absolute;
          bottom: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(243,226,192,0.9), rgba(212,175,122,0));
          animation: floatUp linear infinite;
          pointer-events: none;
        }

        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }

        .lux-card {
          position: relative;
          width: 92%;
          max-width: 400px;
          height: 88vh;
          border-radius: 6px;
          background: linear-gradient(180deg, rgba(24,20,17,0.92), rgba(16,13,11,0.96));
          border: 1px solid rgba(212,175,122,0.35);
          box-shadow:
            0 0 0 1px rgba(212,175,122,0.08),
            0 30px 60px -20px rgba(0,0,0,0.7),
            inset 0 0 60px rgba(212,175,122,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2.2rem 1.6rem;
          overflow: hidden;
        }

        .lux-card::before {
          content: '';
          position: absolute;
          inset: 10px;
          border: 1px solid rgba(212,175,122,0.22);
          border-radius: 3px;
          pointer-events: none;
        }

        .lux-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(212,175,122,0.06) 45%, transparent 70%);
          background-size: 250% 250%;
          animation: sheen 8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes sheen {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }

        .progress-dots {
          position: absolute;
          top: 22px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 20;
        }
        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(212,175,122,0.25);
          transition: all 0.5s ease;
        }
        .dot.active {
          background: #d4af7a;
          box-shadow: 0 0 8px rgba(212,175,122,0.8);
          width: 16px;
          border-radius: 3px;
        }

        .step-enter {
          animation: stepIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .seal {
          width: 108px;
          height: 108px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 35% 30%, #f3e2c0, #d4af7a 45%, #8a6329 100%);
          box-shadow: 0 0 0 4px rgba(212,175,122,0.12), 0 0 30px rgba(212,175,122,0.45);
          animation: sealGlow 3.2s ease-in-out infinite;
          position: relative;
        }
        .seal::before {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px dashed rgba(60,40,10,0.4);
        }
        @keyframes sealGlow {
          0%, 100% { box-shadow: 0 0 0 4px rgba(212,175,122,0.12), 0 0 26px rgba(212,175,122,0.4); }
          50% { box-shadow: 0 0 0 4px rgba(212,175,122,0.2), 0 0 42px rgba(212,175,122,0.65); }
        }
        .seal-letter {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 2.6rem;
          color: #3a2a10;
        }

        .lux-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          font-style: italic;
          font-size: 2.1rem;
          line-height: 1.25;
          min-height: 5.5rem;
          background: linear-gradient(100deg, #d4af7a, #f6ecd4 45%, #d4af7a);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3.5s linear infinite;
          margin-top: 1.4rem;
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 220% center; }
        }

        .lux-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: #f1e4c6;
          letter-spacing: 0.02em;
          margin-top: 0.6rem;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }

        .divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4af7a, transparent);
          margin: 1.1rem 0;
        }

        .lux-btn {
          margin-top: 2.2rem;
          padding: 0.85rem 2.1rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f1e4c6;
          background: transparent;
          border: 1px solid rgba(212,175,122,0.55);
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }
        .lux-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #d4af7a;
          transform: translateX(-100%);
          transition: transform 0.35s ease;
          z-index: -1;
        }
        .lux-btn:hover {
          color: #14100d;
        }
        .lux-btn:hover::before {
          transform: translateX(0);
        }
        .lux-btn:active { transform: scale(0.97); }

        .cake-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 0.4rem;
        }
        .candles { display: flex; gap: 14px; margin-bottom: 4px; }
        .candle { display: flex; flex-direction: column; align-items: center; }
        .flame {
          width: 9px;
          height: 14px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          background: radial-gradient(circle at 50% 70%, #fff2c9, #f3c765 55%, #c9861f 100%);
          box-shadow: 0 0 10px rgba(243,199,101,0.9), 0 0 22px rgba(243,199,101,0.5);
          animation: flicker 0.9s ease-in-out infinite;
        }
        @keyframes flicker {
          0%, 100% { transform: scaleY(1) scaleX(1) rotate(0deg); }
          30% { transform: scaleY(1.08) scaleX(0.94) rotate(-2deg); }
          60% { transform: scaleY(0.94) scaleX(1.04) rotate(2deg); }
        }
        .wick { width: 3px; height: 26px; background: linear-gradient(180deg, #5c1a2b, #3a1119); border-radius: 2px; }
        .smoke {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(220,220,220,0.5);
          animation: smokeRise 1.6s ease-out infinite;
        }
        @keyframes smokeRise {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(-24px) scale(2.4); opacity: 0; }
        }
        .cake-body {
          width: 190px;
          height: 108px;
          border-radius: 10px 10px 6px 6px;
          background: linear-gradient(180deg, #5c1a2b, #3a1119);
          box-shadow: 0 12px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(212,175,122,0.25);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .cake-band {
          position: absolute;
          top: 30px;
          left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #d4af7a 20%, #f3e2c0 50%, #d4af7a 80%, transparent);
        }
        .cake-icing {
          margin-top: 8px;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: #f6ecd4;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-shadow: 0 1px 6px rgba(0,0,0,0.6);
        }

        .wish-card {
          background: linear-gradient(135deg, rgba(212,175,122,0.1), rgba(92,26,43,0.16));
          border: 1px solid rgba(212,175,122,0.28);
          border-radius: 3px;
          padding: 1rem 1.1rem;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: #f8f0dc;
          line-height: 1.5;
          opacity: 0;
          animation: slideUp 0.7s ease-out forwards;
          position: relative;
        }
        .wish-card::before {
          content: '❦';
          position: absolute;
          top: -11px;
          left: 50%;
          transform: translateX(-50%);
          background: #14100d;
          padding: 0 8px;
          color: #d4af7a;
          font-size: 0.9rem;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .confetti-piece {
          position: absolute;
          top: -10px;
          width: 7px;
          height: 12px;
          animation: confettiFall linear forwards;
          z-index: 5;
        }
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(540deg); opacity: 0.9; }
        }

        .signature {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: #f1e4c6;
          font-size: 0.95rem;
          margin-top: 1.4rem;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }

        @media (prefers-reduced-motion: reduce) {
          .lux-card::after, .seal, .flame, .lux-title, .particle, .confetti-piece, .smoke {
            animation: none !important;
          }
        }
      `}</style>

            {[...Array(14)].map((_, i) => (
                <span
                    key={i}
                    className="particle"
                    style={{
                        left: `${(i * 7.3) % 100}%`,
                        width: `${3 + (i % 3)}px`,
                        height: `${3 + (i % 3)}px`,
                        animationDuration: `${8 + (i % 5) * 2}s`,
                        animationDelay: `${i * 0.6}s`,
                    }}
                />
            ))}

            <div className="lux-card">
                <div className="progress-dots">
                    {Array.from({ length: STEP_COUNT }).map((_, i) => (
                        <span key={i} className={`dot ${i === step ? 'active' : ''}`} />
                    ))}
                </div>

                {step === 4 &&
                    confetti.map((c) => (
                        <span
                            key={c.id}
                            className="confetti-piece"
                            style={{
                                left: `${c.left}%`,
                                background: c.gold ? '#d4af7a' : '#5c1a2b',
                                animationDuration: `${c.duration}s`,
                                animationDelay: `${c.delay}s`,
                                transform: `rotate(${c.rotate}deg)`,
                            }}
                        />
                    ))}

                {step === 0 && (
                    <div className="step-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-e-djcjFH98fj9Jv_nG8sF6inWQKYEXbh5GFIbLp9PA&s=10"
                            alt="Birthday celebration"
                            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                        />
                        <h1 className="lux-title">{displayText}</h1>
                        <div className="divider" />
                        <p className="lux-sub">Ek khaas dawat, sirf aapke naam</p>
                        <button className="lux-btn" onClick={nextStep}>Begin the Celebration ✨</button>
                    </div>
                )}

                {step === 1 && (
                    <div className="step-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="lux-sub" style={{ marginBottom: '1.6rem' }}>Aankhein band karo aur ek wish maango</p>
                        <div className="cake-wrap flex flex-col items-center">
                            {/* Candles */}
                            <div className="candles flex gap-3 mb-1 z-20">
                                {[0, 1, 2].map((c) => (
                                    <div className="candle flex flex-col items-center" key={c}>
                                        {candlesLit && <div className="flame" />}
                                        <div className="wick" />
                                        <div className="candle-body" />
                                    </div>
                                ))}
                            </div>

                            {/* Cake */}
                            <div className="relative flex flex-col items-center">
                                {/* Top layer */}
                                <div className="relative w-32 h-14 bg-gradient-to-b from-pink-300 to-pink-500 rounded-t-2xl rounded-b-lg shadow-md z-10">
                                    <div className="absolute top-0 left-0 w-full h-4 bg-white rounded-t-2xl">
                                        <div className="absolute top-2 left-3 w-3 h-4 bg-white rounded-b-full" />
                                        <div className="absolute top-2 left-10 w-3 h-5 bg-white rounded-b-full" />
                                        <div className="absolute top-2 right-10 w-3 h-4 bg-white rounded-b-full" />
                                        <div className="absolute top-2 right-3 w-3 h-5 bg-white rounded-b-full" />
                                    </div>
                                </div>

                                {/* Middle layer */}
                                <div className="relative w-40 h-16 bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-xl rounded-b-lg shadow-lg z-10 -mt-1">
                                    <div className="absolute top-0 left-0 w-full h-5 bg-white rounded-t-xl">
                                        <div className="absolute top-3 left-4 w-4 h-5 bg-white rounded-b-full" />
                                        <div className="absolute top-3 left-14 w-4 h-6 bg-white rounded-b-full" />
                                        <div className="absolute top-3 right-14 w-4 h-5 bg-white rounded-b-full" />
                                        <div className="absolute top-3 right-4 w-4 h-6 bg-white rounded-b-full" />
                                    </div>
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-sm">
                                        Sali Ji
                                    </div>
                                </div>

                                {/* Bottom layer */}
                                <div className="relative w-52 h-20 bg-gradient-to-b from-pink-500 to-pink-700 rounded-t-xl rounded-b-2xl shadow-xl z-10 -mt-1">
                                    <div className="absolute top-0 left-0 w-full h-6 bg-white rounded-t-xl">
                                        <div className="absolute top-4 left-6 w-5 h-6 bg-white rounded-b-full" />
                                        <div className="absolute top-4 left-16 w-5 h-7 bg-white rounded-b-full" />
                                        <div className="absolute top-4 right-16 w-5 h-6 bg-white rounded-b-full" />
                                        <div className="absolute top-4 right-6 w-5 h-7 bg-white rounded-b-full" />
                                    </div>

                                    {/* Decorations */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                        <div className="w-3 h-3 bg-yellow-300 rounded-full shadow-md" />
                                        <div className="w-3 h-3 bg-purple-300 rounded-full shadow-md" />
                                        <div className="w-3 h-3 bg-yellow-300 rounded-full shadow-md" />
                                    </div>
                                </div>

                                {/* Cake stand */}
                                <div className="w-64 h-3 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full shadow-lg mt-1" />
                                <div className="w-20 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-full shadow-md" />
                            </div>
                        </div>
                        <button className="lux-btn" onClick={nextStep}>Blow the Candles</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="step-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 className="lux-title" style={{ fontSize: '1.7rem', minHeight: 'auto' }}>Aapki Wish lock Ho Gayi</h2>
                        <p className="lux-sub" style={{ marginTop: '0.8rem', maxWidth: '260px' }}>
                            Yeh khamoshi se, poori tarah aap tak zaroor pahunchegi.
                        </p>
                        <div className="cake-wrap" style={{ marginTop: '1.6rem' }}>
                            <div className="candles">
                                {[0, 1, 2].map((c) => (
                                    <div className="candle" key={c}>
                                        <div className="smoke" />
                                        <div className="wick" />
                                    </div>
                                ))}
                            </div>
                            <div className="cake-body">
                                <div className="cake-band" />
                                <span className="cake-icing">Sali Ji</span>
                            </div>
                        </div>
                        <button className="lux-btn" onClick={nextStep}>Reveal the Wishes</button>
                    </div>
                )}

                {step === 3 && (
                    <div className="step-enter" style={{ width: '100%' }}>
                        <h2 className="lux-title" style={{ fontSize: '1.7rem', minHeight: 'auto', marginTop: 0 }}>Aapke Liye Kuch Khass ❤️</h2>
                        <div className="divider" style={{ margin: '1rem auto 1.4rem' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                            {wishes.map((wish, i) => (
                                <div key={i} className="wish-card" style={{ animationDelay: `${i * 0.3 + 0.1}s` }}>
                                    {wish}
                                </div>
                            ))}
                        </div>
                        <button className="lux-btn" onClick={nextStep}>One Last Surprise</button>
                    </div>
                )}

                {step === 4 && (
                    <div className="step-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="seal" style={{ width: '86px', height: '86px' }}>
                            <span className="seal-letter" style={{ fontSize: '2rem' }}>♥</span>
                        </div>
                        <h2 className="lux-title" style={{ fontSize: '1.8rem' }}>Hamesha Chamakte Raho</h2>
                        <p className="lux-sub" style={{ maxWidth: '270px', marginTop: '0.6rem' }}>
                            Zindagi hamesha khushiyon, pyaar aur khaamosh kamiyabi se lipti rahe.
                        </p>
                        <p className="signature">— pyaar se, aapka future jija</p>
                        <button className="lux-btn" onClick={restart}>Begin Again</button>
                    </div>
                )}
            </div>
        </main>
    );
}
