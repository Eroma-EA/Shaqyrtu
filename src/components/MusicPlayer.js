"use client";
import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer({ musicUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoTriggered, setAutoTriggered] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.75;
    audio.onerror = () => {};
    audioRef.current = audio;

    // ── Attempt immediate autoplay ──
    const tryAutoplay = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setAutoTriggered(true);
        })
        .catch(() => {
          // Blocked by browser — wait for first user gesture
          listenForGesture();
        });
    };

    // ── Fallback: play on first interaction ──
    const onFirstGesture = () => {
      if (audioRef.current && !audioRef.current.paused) return;
      audioRef.current?.play()
        .then(() => {
          setIsPlaying(true);
          setAutoTriggered(true);
        })
        .catch(() => {});
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click',      onFirstGesture);
      window.removeEventListener('touchstart', onFirstGesture);
      window.removeEventListener('scroll',     onFirstGesture);
      window.removeEventListener('keydown',    onFirstGesture);
    };

    const listenForGesture = () => {
      window.addEventListener('click',      onFirstGesture, { once: true });
      window.addEventListener('touchstart', onFirstGesture, { once: true });
      window.addEventListener('scroll',     onFirstGesture, { once: true, passive: true });
      window.addEventListener('keydown',    onFirstGesture, { once: true });
    };

    tryAutoplay();

    return () => {
      audio.pause();
      cleanup();
    };
  }, [musicUrl]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
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
          <text fill="#BFA16E" fontSize="12.5" fontFamily="'Montserrat', sans-serif" fontWeight="300" letterSpacing="3">
            <textPath href="#mp-path" startOffset="0%">
              Бізбен бірге болыңыз • Музыканы тыңдаңыз • 
            </textPath>
          </text>
        </svg>
      </div>

      {/* Centre button */}
      <div className={`mp-btn ${isPlaying ? 'mp-btn-active' : ''}`}>
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="4" width="4" height="16" rx="1" fill="currentColor" />
            <rect x="15" y="4" width="4" height="16" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M7 4L20 12L7 20V4Z" fill="currentColor" />
          </svg>
        )}
      </div>

      {/* Auto-play hint — shown briefly then fades */}
      {autoTriggered && (
        <div className="mp-hint">♪ авто</div>
      )}

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

        .mp-hint {
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 2px;
          color: var(--gold);
          text-transform: uppercase;
          white-space: nowrap;
          animation: fadeHint 4s ease forwards;
        }

        @keyframes fadeHint {
          0%   { opacity: 0; }
          20%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
