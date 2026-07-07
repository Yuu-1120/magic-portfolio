'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Aethera.module.scss';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

const NAV_ITEMS = ['Home', 'Studio', 'About', 'Journal', 'Reach Us'];

export default function Aethera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const updateOpacity = () => {
      if (video.duration && !isNaN(video.duration)) {
        const time = video.currentTime;
        const dur = video.duration;
        const fadeOutStart = dur - 0.5;

        if (time < 0.5) {
          video.style.opacity = String(time / 0.5);
        } else if (time > fadeOutStart) {
          video.style.opacity = String((dur - time) / 0.5);
        } else {
          video.style.opacity = '1';
        }
      }
      rafId = requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    rafId = requestAnimationFrame(updateOpacity);

    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500&display=swap');
      `}</style>

      {/* Video Background */}
      <div className={styles.videoLayer}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          playsInline
          src={VIDEO_URL}
          style={{ opacity: 0, transition: 'opacity 0.1s' }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay} />

      {/* Navigation */}
      <nav className={styles.nav}>
        <span className={styles.logo}>
          Aethera<span className={styles.logoSup}>®</span>
        </span>
        <div className={styles.navMenu}>
          {NAV_ITEMS.map(item => (
            <a key={item} href='#' className={`${styles.navLink} ${item === 'Home' ? styles.navLinkActive : ''}`}>
              {item}
            </a>
          ))}
          <button className={styles.navCta}>Begin Journey</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.headline}>
          Beyond <span className={styles.headlineGray}>silence,</span> we build{' '}
          <span className={styles.headlineGray}>the eternal.</span>
        </h1>
        <p className={styles.description}>
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft
          digital havens for deep work and pure flows.
        </p>
        <button className={styles.heroCta}>Begin Journey</button>
      </section>
    </div>
  );
}
