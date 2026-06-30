export default function Calendar({ dateString }) {
  // Parse day, month, year from "DD.MM.YYYY"
  const parts    = dateString.split('.');
  const wDay     = parseInt(parts[0], 10);  // day of month to highlight
  const month    = parseInt(parts[1], 10);  // 1-based month
  const year     = parseInt(parts[2], 10);

  // Month names in Kazakh
  const monthNames = [
    '', 'Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым',
    'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'
  ];

  // Days in month
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // First weekday of month: 0=Sun,1=Mon...6=Sat → convert to Mon-first (0=Mon ... 6=Sun)
  const rawFirst  = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const firstDay  = rawFirst === 0 ? 6 : rawFirst - 1;     // 0=Mon … 6=Sun

  const weeks = ['ДС', 'СС', 'СР', 'БС', 'ЖМ', 'СБ', 'ЖБ'];

  // Leading empty cells
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="cal-wrap">
      <p className="cal-month">{monthNames[month]} {year}</p>

      {/* Weekday row */}
      <div className="cal-head">
        {weeks.map((w) => (
          <span key={w} className="cal-wday">{w}</span>
        ))}
      </div>

      {/* Days grid */}
      <div className="cal-grid">
        {blanks.map((_, i) => (
          <span key={`b-${i}`} className="cal-day cal-blank" />
        ))}
        {days.map((d) => (
          <span
            key={d}
            className={`cal-day ${d === wDay ? 'cal-highlight' : ''}`}
          >
            {d === wDay ? (
              <span className="cal-heart-wrap" aria-label="Той күні">
                <svg className="cal-heart" viewBox="0 0 32 30" fill="none" aria-hidden="true">
                  <path
                    className="cal-heart-path"
                    d="M16 27S2 18.5 2 9.5C2 5.36 5.36 2 9.5 2c2.75 0 5.15 1.5 6.5 3.74C17.35 3.5 19.75 2 22.5 2 26.64 2 30 5.36 30 9.5 30 18.5 16 27 16 27Z"
                  />
                </svg>
                <span className="cal-day-num">{d}</span>
              </span>
            ) : (
              d
            )}
          </span>
        ))}
      </div>

      <style jsx>{`
        .cal-wrap {
          width: 100%;
          max-width: 340px;
          margin: 0 auto;
          padding: 0 4px;
        }

        .cal-month {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--text-soft);
          text-align: center;
          margin-bottom: 16px;
        }

        .cal-head {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          margin-bottom: 18px;
        }

        .cal-wday {
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.5px;
          color: var(--text-soft);
          text-transform: uppercase;
          text-align: center;
        }

        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          row-gap: 14px;
        }

        .cal-day {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 400;
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 34px;
        }

        .cal-blank {
          visibility: hidden;
        }

        /* ── Wedding day heart wrapper ── */
        .cal-heart-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
        }

        .cal-heart {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          animation: heartbeat 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          transform-origin: center;
        }

        @keyframes heartbeat {
          0%   { transform: scale(1);    }
          14%  { transform: scale(1.18); }
          28%  { transform: scale(1);    }
          42%  { transform: scale(1.12); }
          56%  { transform: scale(1);    }
          100% { transform: scale(1);    }
        }

        .cal-heart-path {
          stroke: var(--mocha-deep);
          stroke-width: 1.6;
          fill: rgba(107, 91, 71, 0.06);
          stroke-linejoin: round;
        }

        .cal-day-num {
          position: relative;
          z-index: 1;
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 600;
          color: var(--mocha-deep);
        }
      `}</style>
    </div>
  );
}
