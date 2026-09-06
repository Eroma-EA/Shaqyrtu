"use client";

import { useEffect } from 'react';

export default function AutoScroll() {
  useEffect(() => {
    const speed = 22; // CSS pixels per second, independent of screen refresh rate.
    const resumeDelay = 2000;
    let frame;
    let lastTime = performance.now();
    let resumeAt = lastTime;
    let pointerHeld = false;
    let expectedY = window.scrollY;
    let position = expectedY;

    const pause = () => {
      resumeAt = performance.now() + resumeDelay;
      position = window.scrollY;
      expectedY = position;
    };
    const onPointerDown = () => { pointerHeld = true; pause(); };
    const onPointerUp = () => { pointerHeld = false; pause(); };
    const onKeyDown = (event) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) pause();
    };
    const onScroll = () => {
      // Our own animation must not restart the two-second pause.
      // Manual scrolling and touch momentum both postpone the restart.
      if (Math.abs(window.scrollY - expectedY) > 1) pause();
    };
    const onVisibilityChange = () => { pointerHeld = false; pause(); };

    const tick = (now) => {
      const elapsed = Math.min(now - lastTime, 50);
      lastTime = now;
      const editing = document.activeElement?.matches('input, textarea, select, [contenteditable="true"]');
      if (document.hidden || pointerHeld || editing || now < resumeAt) {
        position = window.scrollY;
        expectedY = position;
      } else {
        const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        position = Math.min(bottom, position + speed * elapsed / 1000);
        // Instant substeps avoid fighting the site's CSS smooth-scroll behavior.
        window.scrollTo({ top: position, left: window.scrollX, behavior: 'instant' });
        expectedY = window.scrollY;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    window.addEventListener('wheel', pause, { passive: true });
    window.addEventListener('touchmove', pause, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('focusout', pause);
    document.addEventListener('visibilitychange', onVisibilityChange);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('wheel', pause);
      window.removeEventListener('touchmove', pause);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('focusout', pause);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return null;
}
