'use client';

import React from 'react';
import { FiMail } from 'react-icons/fi';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import styles from './OrbisNft.module.scss';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4';
const ABOUT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4';
const CARD_VIDEOS = [
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
    score: '8.7/10'
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
    score: '9/10'
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
    score: '8.2/10'
  }
];
const CTA_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4';

const NAV_LINKS = ['Homepage', 'Gallery', 'Buy NFT', 'FAQ', 'Contact'];
const ABOUT_TEXT =
  'A digital object fixed beyond time and place. An exploration of distance, form, and silence in space';

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return <button className={`${styles.socialBtn} ${styles.liquidGlass}`}>{icon}</button>;
}

export default function OrbisNft() {
  const socialIcons = [
    <SocialButton key='mail' icon={<FiMail size={20} />} />,
    <SocialButton key='twitter' icon={<FaTwitter size={20} />} />,
    <SocialButton key='github' icon={<FaGithub size={20} />} />
  ];

  return (
    <div style={{ background: '#010828', minHeight: '100vh', width: '100%' }}>
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Condiment&display=swap');
      `}</style>

      {/* Texture Overlay */}
      <div className={styles.textureOverlay} />

      {/* SECTION 1: HERO */}
      <section className={`${styles.section} ${styles.heroSection}`}>
        <video className={styles.videoBg} autoPlay loop muted playsInline src={HERO_VIDEO} />
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.logo}>Orbis.Nft</span>
            <nav className={`${styles.nav} ${styles.liquidGlass}`}>
              <ul className={styles.navList}>
                {NAV_LINKS.map(link => (
                  <li key={link}>
                    <a href='#' className={styles.navLink}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.heroContent}>
            <div style={{ position: 'relative' }}>
              <h1 className={styles.heroHeading}>
                Beyond earth
                <br />
                and ( its ) familiar
                <br />
                boundaries
              </h1>
              <span
                className={styles.cursiveAccent}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '30%',
                  fontSize: 'clamp(24px, 4vw, 48px)',
                  transform: 'rotate(-1deg)'
                }}
              >
                Nft collection
              </span>
            </div>

            {/* Desktop social icons */}
            <div className={`${styles.socialIconsDesktop} hidden-mobile`}>{socialIcons}</div>

            {/* Mobile social icons */}
            <div className={`${styles.socialIconsMobile} show-mobile`}>{socialIcons}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className={`${styles.section} ${styles.aboutSection}`}>
        <video className={styles.videoBg} autoPlay loop muted playsInline src={ABOUT_VIDEO} />
        <div className={styles.container} style={{ padding: '64px 24px' }}>
          <div className={styles.aboutTop}>
            <div style={{ position: 'relative', flex: 1 }}>
              <h2 className={styles.aboutHeading}>
                Hello!
                <br />I am orbis
              </h2>
              <span
                className={styles.cursiveAccent}
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  fontSize: 'clamp(36px, 5vw, 68px)',
                  transform: 'rotate(-1deg)'
                }}
              >
                Orbis
              </span>
            </div>
            <p className={styles.aboutText}>{ABOUT_TEXT}</p>
          </div>

          <div className={styles.aboutBottom}>
            <div style={{ display: 'flex', gap: 64 }}>
              <p className={styles.aboutDecorative}>{ABOUT_TEXT}</p>
              <p className={styles.aboutDecorative}>{ABOUT_TEXT}</p>
            </div>
            <div style={{ display: 'flex', gap: 64 }} className='hide-mobile'>
              <p className={styles.aboutDecorative}>{ABOUT_TEXT}</p>
              <p className={styles.aboutDecorative}>{ABOUT_TEXT}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COLLECTION */}
      <section className={`${styles.section} ${styles.collectionSection}`}>
        <div className={styles.container}>
          <div className={styles.collectionHeader}>
            <h2 className={styles.collectionHeading}>
              Collection of
              <br />
              <span style={{ marginLeft: 'clamp(48px, 8vw, 128px)' }}>
                <span className={styles.cursiveAccent} style={{ textTransform: 'none' }}>
                  Space{' '}
                </span>
                objects
              </span>
            </h2>
            <button className={styles.collectionBtn}>
              <div className={styles.collectionBtnText}>
                <span className={styles.collectionBtnLarge}>SEE</span>
                <div>
                  <div className={styles.collectionBtnSmall}>ALL</div>
                  <div className={styles.collectionBtnSmall}>CREATORS</div>
                </div>
              </div>
              <div className={styles.collectionBtnBar} />
            </button>
          </div>

          <div className={styles.cardGrid}>
            {CARD_VIDEOS.map((card, i) => (
              <div key={i} className={`${styles.card} ${styles.liquidGlass}`}>
                <div className={styles.cardVideoWrapper}>
                  <video className={styles.cardVideo} autoPlay loop muted playsInline src={card.url} />
                  <div className={`${styles.cardOverlay} ${styles.liquidGlass}`}>
                    <div className={styles.cardScore}>
                      <span className={styles.cardScoreLabel}>RARITY SCORE:</span>
                      <span className={styles.cardScoreValue}>{card.score}</span>
                    </div>
                    <button className={styles.cardArrowBtn}>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M9 18l6-6-6-6' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <video className={styles.ctaVideo} autoPlay loop muted playsInline src={CTA_VIDEO} />
        <div className={styles.ctaContent}>
          <div className={styles.ctaTextBlock}>
            <span
              className={styles.cursiveAccent}
              style={{
                position: 'absolute',
                left: 0,
                top: -20,
                fontSize: 'clamp(17px, 5vw, 68px)',
                textTransform: 'none'
              }}
            >
              Go beyond
            </span>
            <h2 className={styles.ctaHeading}>
              <span style={{ marginBottom: 'clamp(16px, 3vw, 48px)', display: 'block' }}>JOIN US.</span>
              REVEAL WHAT&apos;S HIDDEN.
              <br />
              DEFINE WHAT&apos;S NEXT.
              <br />
              FOLLOW THE SIGNAL.
            </h2>
          </div>
        </div>

        {/* Bottom-left social icons */}
        <div className={`${styles.ctaSocial} ${styles.liquidGlass}`}>
          <button className={styles.ctaSocialBtn}>
            <FiMail size={20} />
          </button>
          <button className={styles.ctaSocialBtn}>
            <FaTwitter size={20} />
          </button>
          <button className={styles.ctaSocialBtn}>
            <FaGithub size={20} />
          </button>
        </div>
      </section>

      {/* Responsive helper styles */}
      <style jsx global>{`
        .hidden-mobile {
          display: none;
        }
        .show-mobile {
          display: flex;
        }
        .hide-mobile {
          display: none;
        }
        @media (min-width: 1024px) {
          .hidden-mobile {
            display: flex;
          }
          .show-mobile {
            display: none;
          }
          .hide-mobile {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
