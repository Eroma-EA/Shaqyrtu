"use client";
import { useState, useRef, useEffect } from 'react';

const CIRCLE_TEXTS = [
  'Бізбен бірге болыңыз • Музыканы тыңдаңыз • ',
  'Бізбен бірге болыңыз • Музыканы тыңдаңыз • ',
];

export default function MusicPlayer({ musicUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.onerror = () => {}; // Suppress error if file is missing / empty
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, [musicUrl]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {}); // Silently ignore if audio can't play
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mp-wrap" onClick={toggle} title={isPlaying ? 'Тоқтату' : 'Ойнату'}>

      {/* Spinning ring */}
      <div className={`mp-ring ${isPlaying ? 'mp-spin' : ''}`}>
        <svg viewBox="0 0 200 200" width="140" height="140">
          <defs>
            <path
              id="mp-path"
              d="M 100,100 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
            />
          </defs>
          <text fill="#BFA16E" fontSize="12.5" fontFamily="'Jost', sans-serif" fontWeight="300" letterSpacing="3">
            <textPath href="#mp-path" startOffset="0%">
              Бізбен бірге болыңыз • Музыканы тыңдаңыз • 
            </textPath>
          </text>
        </svg>
      </div>

      {/* Centre button */}
      <div className={`mp-btn ${isPlaying ? 'mp-btn-active' : ''}`}>
        {isPlaying ? (
          /* Pause icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="4" width="4" height="16" rx="1" fill="currentColor" />
            <rect x="15" y="4" width="4" height="16" rx="1" fill="currentColor" />
          </svg>
        ) : (
          /* Play icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M7 4L20 12L7 20V4Z" fill="currentColor" />
          </svg>
        )}
      </div>

      <style jsx>{`
        .mp-wrap {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .mp-ring {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mp-spin {
          animation: mpSpin 14s linear infinite;
        }

        @keyframes mpSpin {
          to { transform: rotate(360deg); }
        }

        .mp-btn {
          position: relative;
          z-index: 2;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--warm-white);
          border: 1.5px solid var(--gold);
          color: var(--mocha);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s, color 0.3s, transform 0.2s;
          box-shadow: 0 4px 20px rgba(107, 91, 71, 0.18);
        }

        .mp-btn-active {
          background: var(--mocha);
          color: var(--text-on-sand);
          border-color: var(--mocha);
        }

        .mp-wrap:hover .mp-btn {
          transform: scale(1.07);
        }
      `}</style>
    </div>
  );
}
