"use client";
import { useState, useEffect, useRef } from 'react';

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function Timer({ targetDate }) {
  const [t, setT]         = useState(null);
  const [expired, setExp] = useState(false);
  const intervalRef       = useRef(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setT({ d: 0, h: 0, m: 0, s: 0 });
        setExp(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        setT({
          d: Math.floor(diff / 86_400_000),
          h: Math.floor((diff % 86_400_000) / 3_600_000),
          m: Math.floor((diff % 3_600_000) / 60_000),
          s: Math.floor((diff % 60_000) / 1_000),
        });
      }
    };

    tick(); // immediate first call — no 1s blank state
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetDate]);

  const units = [
    { val: t?.d ?? 0, label: 'күн'    },
    { val: t?.h ?? 0, label: 'сағат'  },
    { val: t?.m ?? 0, label: 'минут'  },
    { val: t?.s ?? 0, label: 'секунд' },
  ];

  return (
    <div className={`tw ${t !== null ? 'tw-rdy' : ''}`}>
      <p className="tw-eyebrow">Той салтанатына дейін</p>

      <div className="tw-grid">
        {units.map((u, i) => (
          <div key={i} className="tw-cell">
            <span className="tw-num">{t === null ? '—' : pad(u.val)}</span>
            <span className="tw-lbl">{u.label}</span>
          </div>
        ))}
      </div>

      {expired && (
        <p className="tw-congrats">🎉 Той күні келді!</p>
      )}

      <style jsx>{`
        .tw {
          border: 1px solid var(--sand-light);
          border-radius: 24px;
          padding: 36px 14px 32px;
          text-align: center;
          background: var(--warm-white);
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .tw-rdy { opacity: 1; }

        .tw-eyebrow {
          font-family: var(--font-ui);
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--text-soft);
          margin-bottom: 26px;
        }

        .tw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .tw-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: var(--cream);
          border-radius: 14px;
          padding: 18px 4px 14px;
        }

        .tw-num {
          font-family: var(--font-display);
          font-size: clamp(24px, 7vw, 34px);
          font-weight: 400;
          line-height: 1;
          color: var(--text-main);
          letter-spacing: -1px;
          min-width: 2ch;
          display: block;
        }

        .tw-lbl {
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-soft);
        }

        .tw-congrats {
          margin-top: 24px;
          font-family: var(--font-display);
          font-style: italic;
          font-size: 22px;
          color: var(--mocha);
        }
      `}</style>
    </div>
  );
}
