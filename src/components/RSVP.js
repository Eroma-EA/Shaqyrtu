"use client";
import { useState } from 'react';

const options = [
  { value: 'alone',  label: 'Әрине, келемін' },
  { value: 'couple', label: 'Жұбайыммен келемін' },
  { value: 'no',     label: 'Өкінішке орай, келе алмаймын' },
];

export default function RSVP({ whatsappNumber }) {
  const [name,       setName]       = useState('');
  const [attendance, setAttendance] = useState('');
  const [sent,       setSent]       = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;

    const label = options.find(o => o.value === attendance)?.label ?? '';
    const text  = `Сәлем! Мен, ${name.trim()}, тойға — ${label}.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  if (sent) return (
    <div className="rsvp-thanks">
      <div className="rsvp-check">✓</div>
      <p className="rsvp-thanks-title">Рахмет!</p>
      <p className="rsvp-thanks-sub">Хабарламаңыз жіберілді.</p>
    </div>
  );

  return (
    <div className="rsvp-wrap">
      <p className="rsvp-title">Тойға қатысуыңызды растауыңызды сұраймыз!</p>

      <div className="ornament" style={{ marginBottom: '36px' }}>
        <div className="ornament-dot" />
        <div className="ornament-dot" />
        <div className="ornament-dot" />
      </div>

      <form onSubmit={handleSubmit} className="rsvp-form">

        {/* Name input */}
        <div className="rsvp-field">
          <label className="rsvp-label">Аты-жөніңіз</label>
          <input
            type="text"
            className="rsvp-input"
            placeholder="Аты-жөніңізді енгізіңіз"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Radio options */}
        <div className="rsvp-options">
          {options.map(opt => (
            <label key={opt.value} className={`rsvp-opt ${attendance === opt.value ? 'rsvp-opt-checked' : ''}`}>
              <input
                type="radio"
                name="attendance"
                value={opt.value}
                checked={attendance === opt.value}
                onChange={() => setAttendance(opt.value)}
              />
              <span className="rsvp-radio" />
              <span className="rsvp-opt-label">{opt.label}</span>
            </label>
          ))}
        </div>

        <button type="submit" className="rsvp-submit" disabled={!name.trim() || !attendance}>
          Жауапты WhatsApp-та жіберу
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="rsvp-wa-icon">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2a10 10 0 100 20A10 10 0 0012 2z" fill="#25D366"/>
          </svg>
        </button>
      </form>

      <style jsx>{`
        .rsvp-wrap {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        .rsvp-title {
          font-family: var(--font-ui);
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          text-align: center;
          line-height: 2;
          color: var(--text-main);
          margin-bottom: 28px;
        }
        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .rsvp-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rsvp-label {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--text-soft);
        }
        .rsvp-input {
          border: none;
          border-bottom: 1px solid var(--sand);
          background: transparent;
          padding: 10px 0;
          font-family: var(--font-body);
          font-size: 18px;
          font-weight: 300;
          color: var(--text-main);
          outline: none;
          transition: border-color 0.3s;
          letter-spacing: 0.5px;
        }
        .rsvp-input:focus {
          border-bottom-color: var(--mocha);
        }
        .rsvp-input::placeholder {
          color: var(--sand);
          font-size: 15px;
        }
        .rsvp-options {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .rsvp-opt {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid var(--sand-light);
          transition: border-color 0.25s, background 0.25s;
        }
        .rsvp-opt-checked {
          border-color: var(--mocha);
          background: rgba(107, 91, 71, 0.04);
        }
        .rsvp-opt input {
          display: none;
        }
        .rsvp-radio {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1.5px solid var(--sand-dark);
          position: relative;
          transition: border-color 0.25s;
        }
        .rsvp-opt-checked .rsvp-radio {
          border-color: var(--mocha);
        }
        .rsvp-opt-checked .rsvp-radio::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--mocha);
        }
        .rsvp-opt-label {
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.5px;
          color: var(--text-main);
          line-height: 1.3;
        }
        .rsvp-submit {
          background: var(--mocha);
          color: #fff;
          border-radius: 40px;
          padding: 16px 28px;
          font-family: var(--font-ui);
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.3s, transform 0.2s, opacity 0.3s;
        }
        .rsvp-submit:hover:not(:disabled) {
          background: var(--mocha-deep);
          transform: translateY(-1px);
        }
        .rsvp-submit:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .rsvp-wa-icon {
          flex-shrink: 0;
        }

        /* Thanks state */
        .rsvp-thanks {
          text-align: center;
          padding: 40px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .rsvp-check {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--sand-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: var(--mocha);
        }
        .rsvp-thanks-title {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 32px;
          color: var(--text-main);
        }
        .rsvp-thanks-sub {
          font-family: var(--font-ui);
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 2px;
          color: var(--text-soft);
        }
      `}</style>
    </div>
  );
}
