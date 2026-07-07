'use client';

import React, { useRef, useState, createContext, useContext } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  type ScrollMotionValues
} from 'framer-motion';
import {
  FiCamera,
  FiShoppingBag,
  FiHexagon,
  FiTv,
  FiGlobe,
  FiCreditCard,
  FiLayout,
  FiTarget,
  FiChevronDown,
  FiArrowRight,
  FiDroplet,
  FiActivity
} from 'react-icons/fi';
import styles from './Agency.module.scss';

/* ─── Scroll Container Context ─── */
const ScrollContainerContext = createContext<React.RefObject<HTMLElement | null>>({ current: null });

/* ─── Data ─── */
const NAV_ITEMS = ['Services', 'Work', 'Agency', 'Contact'];
const CLIENTS = [
  { icon: FiCamera, name: 'Instagram' },
  { icon: FiShoppingBag, name: 'Shopify' },
  { icon: FiHexagon, name: 'HubSpot' },
  { icon: FiTv, name: 'CNBC' },
  { icon: FiGlobe, name: 'Business Insider' },
  { icon: FiCreditCard, name: 'Stripe' }
];
const SERVICES = [
  {
    icon: FiLayout,
    title: 'UI/UX Design',
    desc: 'Crafting intuitive interfaces that delight users and drive engagement through research-backed design systems.'
  },
  {
    icon: FiDroplet,
    title: 'Visual Graphic',
    desc: 'Building memorable brand identities with cohesive visual language across all touchpoints and mediums.'
  },
  {
    icon: FiTarget,
    title: 'Strategy',
    desc: 'Data-driven digital strategies that align business objectives with user needs for measurable growth.'
  },
  {
    icon: FiActivity,
    title: 'Business Growth',
    desc: 'Scaling products from concept to market with agile development and performance optimization.'
  }
];
const PROJECTS = [
  {
    title: 'Pixzen',
    cat: 'Brand Identity',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781522720269-Pixzen.webp'
  },
  {
    title: 'Wander',
    cat: 'Travel Platform',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781631791578-Wander_Hero.webp'
  },
  {
    title: 'Agentify',
    cat: 'AI Product',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781671943344-Agentify_Hero.webp'
  },
  {
    title: 'Future',
    cat: 'Automotive',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781679053418-Future_Carousel.webp'
  },
  {
    title: 'Genova',
    cat: 'E-Commerce',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781670271708-Genova_Hero.webp'
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8 }
};

/* ─── Navbar with scroll blur ─── */
function Navbar() {
  const containerRef = useContext(ScrollContainerContext);
  const blur = useMotionValue(8);
  const { scrollY } = useScroll({ container: containerRef });

  useMotionValueEvent(scrollY, 'change', latest => {
    const progress = Math.min(latest / 50, 1);
    blur.set(8 + progress * 16);
  });

  return (
    <motion.div className={styles.navbar}>
      <motion.div
        className={styles.navbarInner}
        style={{
          backdropFilter: useTransform(blur, v => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blur, v => `blur(${v}px)`),
          background: useTransform(blur, v => `rgba(12, 17, 40, ${0.4 + Math.min(v / 50, 1) * 0.4})`)
        }}
      >
        <span className={styles.navLogo}>Stellar®</span>
        <div className={styles.navLinks}>
          {NAV_ITEMS.map(item => (
            <a href={`#${item.toLowerCase()}`} className={styles.navLink} key={item}>
              {item}
              <span className={styles.navLinkUnderline} />
            </a>
          ))}
        </div>
        <button className={styles.navCta}>Start Project</button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero with scroll-based clipPath masking ─── */
function Hero() {
  const containerRef = useContext(ScrollContainerContext);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start start', 'end end']
  });

  const clipPath = useTransform(scrollYProgress, [0, 1], ['circle(0% at 50% 50%)', 'circle(150% at 50% 50%)']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className={styles.heroSection} id='hero'>
      <div className={styles.heroSticky}>
        {/* Base layer - outline */}
        <div className={styles.heroBase}>
          <img
            src='https://res.cloudinary.com/dprydfxok/image/upload/v1782890197/hero_city_outline_fzg37d.jpg'
            alt='City outline sketch'
            className={styles.heroBaseImg}
          />
          <div className={styles.heroText}>
            <h1 className={styles.heroH1}>Imagine the Future</h1>
            <p className={styles.heroSubtext}>Where vision meets possibility</p>
          </div>
        </div>

        {/* Reveal layer - realistic */}
        <motion.div className={styles.heroReveal} style={{ clipPath }}>
          <motion.img
            src='https://res.cloudinary.com/dprydfxok/image/upload/v1782890197/hero_city_iglhwn.jpg'
            alt='Realistic city skyline'
            className={styles.heroRevealImg}
            style={{ scale: bgScale }}
          />
          <div className={styles.heroText}>
            <p className={`${styles.heroH1} ${styles.heroH2Override}`}>Build the Reality</p>
            <p className={styles.heroSubtext}>We turn bold ideas into digital masterpieces</p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiChevronDown size={28} />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Clients with framer-motion ticker ─── */
function Clients() {
  const items = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];
  return (
    <section className={styles.clientsSection}>
      <motion.div {...fadeUp} className={styles.clientsHeader}>
        <div className={styles.clientsBadge}>
          <span>●</span> Interested
        </div>
        <h2 className={styles.clientsTitle}>Trusted by 300+ businesses</h2>
      </motion.div>
      <div className={styles.tickerWrap}>
        <div className={styles.tickerFadeLeft} />
        <div className={styles.tickerFadeRight} />
        <motion.div
          className={styles.tickerTrack}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {items.map((c, i) => (
            <div className={styles.tickerItem} key={i}>
              <c.icon size={20} />
              {c.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Services ─── */
function Services() {
  return (
    <section className={styles.servicesSection} id='services'>
      <motion.div {...fadeUp}>
        <p className={styles.sectionBadge}>What We Do</p>
        <h2 className={styles.sectionTitle}>
          Services Built Specifically
          <br />
          for your Business
        </h2>
      </motion.div>
      <div className={styles.servicesGrid}>
        {SERVICES.map((s, i) => (
          <motion.div key={i} className={styles.serviceCard} {...fadeUp} transition={{ duration: 0.8, delay: i * 0.1 }}>
            <div className={styles.serviceIconWrap}>
              <s.icon size={22} color='#ffffff' />
            </div>
            <h3 className={styles.serviceCardTitle}>{s.title}</h3>
            <p className={styles.serviceCardDesc}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Work with framer-motion expanding gallery ─── */
function Work() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className={styles.workSection} id='work'>
      <motion.div className={styles.workHeader} {...fadeUp}>
        <div>
          <p className={styles.sectionBadge}>Portfolio</p>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
            Our Works
          </h2>
        </div>
        <a href='#' className={styles.workViewAll}>
          View All Projects <FiArrowRight size={16} />
        </a>
      </motion.div>
      <div className={styles.galleryWrap}>
        {PROJECTS.map((p, i) => (
          <motion.div
            key={i}
            className={styles.galleryItem}
            style={{
              flex: activeIndex === i ? 4 : activeIndex === null ? 1 : 0.8
            }}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              flex: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
              opacity: { duration: 0.6, delay: i * 0.1 },
              y: { duration: 0.6, delay: i * 0.1 }
            }}
          >
            <img src={p.img} alt={p.title} className={styles.galleryBg} loading='lazy' />
            <div className={styles.galleryOverlay}>
              <h3 className={styles.galleryTitle}>{p.title}</h3>
              <span className={styles.galleryCat}>{p.cat}</span>
              {activeIndex === i && (
                <motion.button
                  className={styles.galleryCta}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  View Project <FiArrowRight size={14} />
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── About ─── */
function About() {
  return (
    <section className={styles.aboutSection} id='agency'>
      <div className={styles.aboutGlow} />
      <div className={styles.aboutGrid}>
        <motion.div {...fadeUp}>
          <p className={styles.sectionBadge}>About Us</p>
          <h2 className={styles.aboutHeading}>
            Design is not just what it looks like. <span className={styles.aboutAccent}>It&apos;s how it feels.</span>
          </h2>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
          <p className={styles.aboutText}>
            We are a collective of designers, developers, and strategists who believe in the power of thoughtful digital
            experiences. Every pixel we place, every line we code, serves a purpose — to connect brands with their
            audience in the most meaningful way.
          </p>
          <p className={styles.aboutText}>
            Founded on the principle that great design is invisible yet impactful, we craft solutions that stand the
            test of time while pushing the boundaries of what&apos;s possible in the digital landscape.
          </p>
          <div className={styles.aboutStats}>
            <div>
              <p className={styles.statNum}>10+</p>
              <p className={styles.statLabel}>Years Experience</p>
            </div>
            <div>
              <p className={styles.statNum}>150+</p>
              <p className={styles.statLabel}>Global Clients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className={styles.footerSection} id='contact'>
      <motion.div className={styles.footerCta} {...fadeUp}>
        <h2 className={styles.footerHeading}>Let&apos;s create something epic.</h2>
        <button className={styles.footerBtn}>Start a Project</button>
      </motion.div>

      <div className={styles.footerGrid}>
        <div>
          <p className={styles.footerColTitle}>Stellar®</p>
          <p className={styles.aboutText} style={{ fontSize: 13 }}>
            A digital agency crafting premium experiences for forward-thinking brands.
          </p>
        </div>
        <div>
          <p className={styles.footerColTitle}>Navigation</p>
          {['Services', 'Work', 'Agency', 'Contact'].map(l => (
            <a href={`#${l.toLowerCase()}`} className={styles.footerLink} key={l}>
              {l}
            </a>
          ))}
        </div>
        <div>
          <p className={styles.footerColTitle}>Socials</p>
          {['Twitter', 'Dribbble', 'LinkedIn', 'Instagram'].map(l => (
            <a href='#' className={styles.footerLink} key={l}>
              {l}
            </a>
          ))}
        </div>
        <div>
          <p className={styles.footerColTitle}>Contact</p>
          <a href='mailto:hello@stellar.agency' className={styles.footerLink}>
            hello@stellar.agency
          </a>
          <a href='#' className={styles.footerLink}>
            +1 (555) 000-0000
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.footerCopy}>© 2026 Stellar Agency. All rights reserved.</p>
        <div className={styles.footerBottomLinks}>
          <a href='#' className={styles.footerBottomLink}>
            Privacy Policy
          </a>
          <a href='#' className={styles.footerBottomLink}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main ─── */
export default function Agency() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContainerContext value={scrollRef}>
      <div
        ref={scrollRef}
        className={styles.app}
        style={{ position: 'fixed', inset: 0, zIndex: 99999, overflowY: 'auto' }}
      >
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        `}</style>
        <Navbar />
        <main>
          <Hero />
          <Clients />
          <Services />
          <Work />
          <About />
        </main>
        <Footer />
      </div>
    </ScrollContainerContext>
  );
}
