"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import heroStyles from './hero.module.css';
import './invitation-initials.css';
import invitation from './invitation.module.css';
import { weddingConfig } from '../data/config';
import MusicPlayer from '../components/MusicPlayer';
import Calendar from '../components/Calendar';
import RSVP from '../components/RSVP';
import Timer from '../components/Timer';
import AutoScroll from '../components/AutoScroll';

/* ── Decorative divider component ── */
function Divider() {
  return (
    <div className="divider">
      <div className="divider-line" />
      <div className="divider-dot" />
      <div className="divider-diamond" />
      <div className="divider-dot" />
      <div className="divider-line" />
    </div>
  );
}

/* ── Background rotating ornament ── */
function BgOrnament({ className, size = 320, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.classList.add('loaded');
  }, []);
  return (
    <div ref={ref} className={`bg-ornament ${className || ''}`} style={{ width: size, height: size, ...style }}>
      <img
        src="/ornament_circle.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default function Home() {
  const groomInitial = weddingConfig.groom?.trim()?.[0] || '';
  const brideInitial = weddingConfig.bride?.trim()?.[0] || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.wrap}>
      <AutoScroll />

      {/* ──── HERO ──── */}
      <section className={heroStyles.hero}>
        {/* Full-bleed background photo with Ken Burns zoom */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero_couple.jpg"
          alt="Couple"
          className={heroStyles.heroBgPhoto}
        />
        <div className={heroStyles.heroOverlay} />

        {/* Rotating ornaments in hero — brighter via heroOrnament class */}
        <BgOrnament
          className={heroStyles.heroOrnament}
          style={{ position: 'absolute', top: -50, right: -50, zIndex: 2 }}
          size={280}
        />
        <BgOrnament
          className={`bg-ornament-reverse ${heroStyles.heroOrnament}`}
          style={{ position: 'absolute', bottom: 80, left: -80, zIndex: 2 }}
          size={220}
        />

        {/* Top bar */}
        <div className={heroStyles.heroTopBar}>
          <span className={heroStyles.heroTopTag}>Шақыру билеті</span>
          <div className={heroStyles.heroTopLine} />
          <span className={heroStyles.heroMonogram}>{groomInitial} · {brideInitial}</span>
        </div>

        {/* Bottom text — instant fade-in on load, no IntersectionObserver needed */}
        <div className={heroStyles.heroContent}>
          <div className={heroStyles.heroEyebrow}>
            <div className={heroStyles.heroEyebrowLine} />
            <span className={heroStyles.heroEyebrowText}>Үйлену тойы</span>
          </div>

          <h1 className={heroStyles.heroTitle}>
            {weddingConfig.groom}
          </h1>
          <span className={heroStyles.heroAnd}>& {weddingConfig.bride}</span>

          <div className={heroStyles.heroMeta}>
            <span className={heroStyles.heroDate}>{weddingConfig.date}</span>
            <div className={heroStyles.heroDot} />
            <span className={heroStyles.heroDate}>{weddingConfig.time}</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={heroStyles.scrollHint}>
          <div className={heroStyles.scrollHintArrow} />
        </div>
      </section>

      {/* ──── MUSIC PLAYER ──── */}
      <section className={`${styles.playerSection} reveal reveal-delay-1`}>
        <MusicPlayer musicUrl={weddingConfig.musicUrl} />
        <span className={styles.playerHint}>Музыканы тыңдаңыз</span>
      </section>

      {/* ──── INVITATION CARD ──── */}
      <section
        className={`${styles.invCard} ${invitation.card} invitation-initials reveal`}
        data-groom-initial={groomInitial}
        data-bride-initial={brideInitial}
        style={{ position: 'relative', overflow: 'hidden' }}
      >

        {/* Rotating ornament — bottom left inside card */}
        <BgOrnament
          className="bg-ornament-reverse"
          style={{ position: 'absolute', bottom: -80, left: -80, zIndex: 0 }}
          size={240}
        />
        {/* Rotating ornament — top right inside card */}
        <BgOrnament
          style={{ position: 'absolute', top: -60, right: -60, zIndex: 0 }}
          size={200}
        />

        <div className={invitation.frame} aria-hidden="true" />
        <div className={invitation.content}>
          <h2 className={`${invitation.heading} reveal`}>Құрметті</h2>
          <p className={`${invitation.guests} reveal reveal-delay-1`}>
            ағайын-туыс, бауырлар,<br />
            нағашылар, жиен-бөлелер,<br />
            құда-жекжат, дос-жарандар,<br />
            әріптестер мен көршілер!
          </p>

          <div className={`ornament ${invitation.divider} reveal reveal-delay-2`} aria-hidden="true">
            <div className="ornament-dot" />
            <div className="ornament-dot" />
            <div className="ornament-dot" />
          </div>

          <p className={`${invitation.body} reveal reveal-delay-1`}>
            Сіз(дер)ді балаларымыз
          </p>
          <p className={`${invitation.names} reveal reveal-delay-2`}>
            <span>{weddingConfig.groom}</span>
            <span className={invitation.join}>мен</span>
            <span>{weddingConfig.brideGenitive}</span>
          </p>
          <p className={`${invitation.body} reveal reveal-delay-3`}>
            шаңырақ көтеру тойларына арналған салтанатты ақ
            дастарханымыздың сыйлы қонағы болуға шақырамыз!
          </p>
        </div>
      </section>

      {/* ──── DATE & CALENDAR ──── */}
      <section className={`${styles.dateSec} reveal`} style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Background ornament */}
        <BgOrnament
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }}
          size={380}
        />

        <p className={styles.secTitle} style={{ position: 'relative', zIndex: 1 }}>Той салтанаты</p>
        <p className={styles.secSub} style={{ position: 'relative', zIndex: 1 }}>Күні мен уақыты</p>

        <div className={`${styles.dateCard} reveal reveal-delay-1`} style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.dateNum}>{weddingConfig.date}</div>
          <div className={styles.dateTime}>Сағат {weddingConfig.time}</div>
        </div>

        <div className="reveal reveal-delay-2" style={{ position: 'relative', zIndex: 1 }}>
          <Calendar dateString={weddingConfig.date} />
        </div>
      </section>

      {/* ──── VENUE ──── */}
      <section className={`${styles.venueSec} reveal`} style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Background ornament — right side */}
        <BgOrnament
          className="bg-ornament-reverse"
          style={{ position: 'absolute', top: '20%', right: -100, zIndex: 0 }}
          size={280}
        />

        <p className={styles.secTitle} style={{ position: 'relative', zIndex: 1 }}>Мекен-жайымыз</p>
        <p className={styles.secSub} style={{ position: 'relative', zIndex: 1 }}>Той өтетін орын</p>

        <p className={`${styles.venueAddress} reveal reveal-delay-1`} style={{ position: 'relative', zIndex: 1 }}>
          {weddingConfig.address}
        </p>

        <a
          href={weddingConfig.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.mapBtn} reveal reveal-delay-2`}
          style={{ position: 'relative', zIndex: 1, width: 'fit-content', textDecoration: 'none' }}
        >
          2GIS — Картаны ашу
        </a>

        <div className={`${styles.parentsCard} reveal reveal-delay-3`} style={{ position: 'relative', zIndex: 1 }}>
          <Divider />
          {/* <p className={styles.parentsSub}>Той иелері</p> */}
          <h3 className={styles.parentsTitle}>Той иелері</h3>
          <p className={styles.parentsName}>{weddingConfig.parents}</p>
        </div>
      </section>

      {/* ──── RSVP ──── */}
      <section className={`${styles.rsvpSec} reveal`}>
        <RSVP whatsappNumber={weddingConfig.whatsappNumber} />
      </section>

      {/* ──── TIMER ──── */}
      <section className={`${styles.timerSec} reveal`} style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Ornament behind timer */}
        <BgOrnament
          style={{ position: 'absolute', bottom: -40, left: -60, zIndex: 0 }}
          size={220}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Timer targetDate={weddingConfig.targetDate} />
        </div>
      </section>

      {/* ──── FOOTER ──── */}
      <footer className={styles.footer}>
        {weddingConfig.groom} & {weddingConfig.bride} · {weddingConfig.date}
      </footer>

    </main>
  );
}
