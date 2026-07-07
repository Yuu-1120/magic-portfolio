'use client';

import React, { useRef, useState, useEffect, useCallback, createContext, useContext } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  animate
} from 'framer-motion';
import styles from './EffectsShowcase.module.scss';

/* ─── Scroll Container Context ─── */
const ScrollCtx = createContext<React.RefObject<HTMLElement | null>>({ current: null });

/* ─── Shared demo label ─── */
function DemoHeader({ num, cat, title, desc }: { num: string; cat: string; title: string; desc: string }) {
  return (
    <>
      <div className={styles.demoLabel}>
        <span className={styles.demoNum}>{num}</span>
        <span className={styles.demoCat}>{cat}</span>
      </div>
      <h2 className={styles.demoTitle}>{title}</h2>
      <p className={styles.demoDesc}>{desc}</p>
    </>
  );
}

/* ═══ 1. Scroll Reveal Clip ═══ */
function ScrollRevealClip() {
  const containerRef = useContext(ScrollCtx);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, container: containerRef, offset: ['start end', 'end start'] });
  const clip = useTransform(scrollYProgress, [0.15, 0.55], ['inset(50% 50% 50% 50%)', 'inset(0% 0% 0% 0%)']);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={ref} className={styles.revealBox}>
      <motion.img
        src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'
        alt='Earth from space'
        className={styles.revealImg}
        style={{ clipPath: clip }}
      />
      <motion.div className={styles.revealHint} style={{ opacity: hintOpacity }}>
        ↓ Scroll to reveal
      </motion.div>
    </div>
  );
}

/* ═══ 2. Parallax Depth ═══ */
function ParallaxDepth() {
  const containerRef = useContext(ScrollCtx);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, container: containerRef, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const s1 = useTransform(scrollYProgress, [0, 1], [1.15, 0.85]);
  const s2 = useTransform(scrollYProgress, [0, 1], [1.08, 0.92]);
  const o1 = useTransform(scrollYProgress, [0, 1], [0.15, 0.15]);

  return (
    <div ref={ref} className={styles.parallaxBox}>
      <motion.div
        className={`${styles.parallaxLayer} ${styles.parallaxBack}`}
        style={{ y: y1, scale: s1, opacity: o1 }}
      >
        DEPTH
      </motion.div>
      <motion.div className={`${styles.parallaxLayer} ${styles.parallaxMid}`} style={{ y: y2, scale: s2 }}>
        PARALLAX
      </motion.div>
      <motion.div className={`${styles.parallaxLayer} ${styles.parallaxFront}`} style={{ y: y3 }}>
        多层视差滚动
      </motion.div>
    </div>
  );
}

/* ═══ 3. Horizontal Scroll ═══ */
function HorizontalScroll() {
  const containerRef = useContext(ScrollCtx);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, container: containerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);

  const cards = [
    { num: '01', title: 'Strategy & Research' },
    { num: '02', title: 'Brand Identity' },
    { num: '03', title: 'Digital Product' },
    { num: '04', title: 'Motion Design' },
    { num: '05', title: 'Development' },
    { num: '06', title: 'Launch & Scale' }
  ];

  return (
    <div ref={ref} className={styles.hScrollOuter}>
      <div className={styles.hScrollSticky}>
        <motion.div className={styles.hScrollTrack} style={{ x }}>
          {cards.map(c => (
            <div key={c.num} className={styles.hScrollCard}>
              <span className={styles.hScrollCardNum}>{c.num}</span>
              <h3 className={styles.hScrollCardTitle}>{c.title}</h3>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ═══ 4. Text Cascade ═══ */
function TextCascade() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const text = 'Design is intelligence made visible.';
  const words = text.split(' ');

  return (
    <div ref={ref} className={styles.cascadeBox}>
      <p className={styles.cascadeText}>
        {words.map((word, wi) => (
          <span className={styles.cascadeWord} key={wi}>
            {word.split('').map((char, ci) => (
              <motion.span
                className={styles.cascadeChar}
                key={ci}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: wi * 0.08 + ci * 0.03,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </p>
    </div>
  );
}

/* ═══ 5. Magnetic Hover ═══ */
function MagneticHover() {
  const labels = ['Design', 'Code', 'Motion', 'Brand'];

  function MagneticButton({ label }: { label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouse = (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.35);
      y.set((e.clientY - cy) * 0.35);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={ref}
        className={styles.magneticBtn}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
      >
        {label}
      </motion.div>
    );
  }

  return (
    <div className={styles.magneticBox}>
      {labels.map(l => (
        <MagneticButton key={l} label={l} />
      ))}
    </div>
  );
}

/* ═══ 6. Number Odometer ═══ */
function NumberOdometer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  function Counter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
    const [display, setDisplay] = React.useState(0);

    React.useEffect(() => {
      if (!inView) return;
      const controls = animate(0, target, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: v => setDisplay(Math.round(v))
      });
      return () => controls.stop();
    }, [inView, target]);

    return (
      <div className={styles.odometerItem}>
        <span className={styles.odometerNum}>
          {display.toLocaleString()}
          <span className={styles.odometerSuffix}>{suffix}</span>
        </span>
        <p className={styles.odometerLabel}>{label}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className={styles.odometerBox}>
      <Counter target={150} suffix='+' label='Global Clients' />
      <Counter target={98} suffix='%' label='Client Retention' />
      <Counter target={12} suffix='M' label='Users Reached' />
    </div>
  );
}

/* ═══ 7. Gradient Mesh ═══ */
function GradientMesh() {
  return (
    <div className={styles.gradientBox}>
      <div className={`${styles.gradientBlob} ${styles.gradientBlob1}`} />
      <div className={`${styles.gradientBlob} ${styles.gradientBlob2}`} />
      <div className={`${styles.gradientBlob} ${styles.gradientBlob3}`} />
      <p className={styles.gradientText}>Fluid Mesh</p>
    </div>
  );
}

/* ═══ 8. Sticky Stack ═══ */
function StickyStack() {
  const containerRef = useContext(ScrollCtx);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, container: containerRef, offset: ['start start', 'end end'] });

  const cards = [
    {
      bg: '#0f172a',
      tag: 'Discover',
      tagBg: '#6366f1',
      title: 'Research & Insights',
      desc: 'Deep dive into user needs, market trends, and competitive landscapes to uncover opportunities.'
    },
    {
      bg: '#1a0a2e',
      tag: 'Define',
      tagBg: '#ec4899',
      title: 'Strategy & Architecture',
      desc: 'Translate findings into actionable roadmaps with clear milestones and success metrics.'
    },
    {
      bg: '#0a1628',
      tag: 'Deliver',
      tagBg: '#06b6d4',
      title: 'Build & Launch',
      desc: 'Execute with precision — from pixel-perfect interfaces to robust backend systems.'
    }
  ];

  return (
    <div ref={ref} className={styles.stackOuter}>
      <div className={styles.stackSticky}>
        {cards.map((c, i) => {
          const start = i * 0.25;
          const end = start + 0.3;
          const rotate = useTransform(scrollYProgress, [start, end], [0, i % 2 === 0 ? -3 : 3]);
          const scale = useTransform(scrollYProgress, [start, end], [1, 0.95]);
          const y = useTransform(scrollYProgress, [start, end], [0, -30]);

          return (
            <motion.div
              key={i}
              className={styles.stackCard}
              style={{
                background: c.bg,
                rotate: useTransform(rotate, v => `${v}deg`),
                scale,
                y,
                zIndex: cards.length - i
              }}
            >
              <span className={styles.stackCardTag} style={{ background: c.tagBg, color: '#fff' }}>
                {c.tag}
              </span>
              <h3 className={styles.stackCardTitle}>{c.title}</h3>
              <p className={styles.stackCardDesc}>{c.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ 9. Text Mask Window ═══ */
function TextMaskWindow() {
  const containerRef = useContext(ScrollCtx);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, container: containerRef, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1.05]);

  return (
    <div ref={ref} className={styles.maskBox}>
      <div className={styles.maskBg} />
      <motion.span className={styles.maskText} style={{ scale }}>
        CREATE
      </motion.span>
    </div>
  );
}

/* ═══ 10. Staggered Grid Reveal ═══ */
function StaggeredGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const items = ['Branding', 'Web', 'Mobile', 'Motion', '3D', 'Print', 'Photo', 'Strategy'];

  return (
    <div ref={ref} className={styles.gridBox}>
      {items.map((item, i) => (
        <motion.div
          key={item}
          className={styles.gridItem}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className={styles.gridItemLabel}>{item}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══ 11. Cursor Follower ═══ */
function CursorFollower() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });
  const [size, setSize] = useState(40);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!boxRef.current) return;
      const rect = boxRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    };
    const el = boxRef.current;
    el?.addEventListener('mousemove', handleMove);
    return () => el?.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={boxRef} className={styles.cursorBox}>
      <motion.div
        style={{
          position: 'absolute',
          x: useTransform(springX, v => v - size / 2),
          y: useTransform(springY, v => v - size / 2),
          width: size,
          height: size,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.5)',
          pointerEvents: 'none',
          zIndex: 10,
          mixBlendMode: 'difference' as const
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          x: useTransform(springX, v => v - 4),
          y: useTransform(springY, v => v - 4),
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none',
          zIndex: 10
        }}
      />
      <p className={styles.cursorHint}>Move your cursor here</p>
    </div>
  );
}

/* ═══ 12. Scale Reveal ═══ */
function ScaleReveal() {
  const containerRef = useContext(ScrollCtx);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start end', 'center center']
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [80, 24]);

  return (
    <div ref={ref} className={styles.scaleBox}>
      <motion.img
        src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
        alt='Mountain landscape'
        className={styles.scaleImg}
        style={{ scale, opacity, borderRadius: useTransform(borderRadius, v => `${v}px}`) }}
      />
    </div>
  );
}

/* ═══ Floating Nav ═══ */
const EFFECT_LIST = [
  { id: 'fx-01', label: 'Reveal Clip' },
  { id: 'fx-02', label: 'Parallax' },
  { id: 'fx-03', label: 'H-Scroll' },
  { id: 'fx-04', label: 'Text Cascade' },
  { id: 'fx-05', label: 'Magnetic' },
  { id: 'fx-06', label: 'Odometer' },
  { id: 'fx-07', label: 'Gradient Mesh' },
  { id: 'fx-08', label: 'Sticky Stack' },
  { id: 'fx-09', label: 'Text Mask' },
  { id: 'fx-10', label: 'Grid Reveal' },
  { id: 'fx-11', label: 'Cursor' },
  { id: 'fx-12', label: 'Scale Reveal' }
];

function FloatingNav({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: container, threshold: 0.3 }
    );

    EFFECT_LIST.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [containerRef]);

  const handleClick = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      const container = containerRef.current;
      if (el && container) {
        const top = el.offsetTop - container.offsetTop;
        container.scrollTo({ top, behavior: 'smooth' });
      }
    },
    [containerRef]
  );

  return (
    <nav className={styles.floatNav}>
      <div className={styles.floatNavLine} />
      {EFFECT_LIST.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.floatNavItem} ${active === id ? styles.floatNavItemActive : ''}`}
          onClick={() => handleClick(id)}
        >
          <span className={styles.floatNavDot} />
          <span className={styles.floatNavLabel}>{label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══ Main ═══ */
export default function EffectsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollCtx value={scrollRef}>
      <div
        ref={scrollRef}
        className={styles.app}
        style={{ position: 'fixed', inset: 0, zIndex: 99999, overflowY: 'auto' }}
      >
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        `}</style>

        {/* Floating Nav */}
        <FloatingNav containerRef={scrollRef} />

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Premium Effects Lab</h1>
          <p className={styles.headerSub}>
            12 advanced interactive effects. Scroll to explore or use the side nav to jump.
          </p>
        </header>

        <div className={styles.divider} />

        {/* 1 */}
        <section className={styles.demoSection} id='fx-01'>
          <DemoHeader
            num='01'
            cat='Scroll-Driven'
            title='Scroll Reveal Clip'
            desc='clipPath: inset() 从中心向两侧展开，随滚动渐进揭示背景图。Apple 产品页常用。'
          />
          <div className={styles.demoBox}>
            <ScrollRevealClip />
          </div>
        </section>

        <div className={styles.divider} />

        {/* 2 */}
        <section className={styles.demoSection} id='fx-02'>
          <DemoHeader
            num='02'
            cat='Scroll-Driven'
            title='Parallax Depth'
            desc='多层文字以不同速度移动，营造空间纵深感。最经典的视差滚动技法。'
          />
          <div className={styles.demoBox}>
            <ParallaxDepth />
          </div>
        </section>

        <div className={styles.divider} />

        {/* 3 */}
        <section className={styles.demoSection} id='fx-03'>
          <DemoHeader
            num='03'
            cat='Scroll-Driven'
            title='Horizontal Scroll'
            desc='纵向滚动转换为横向位移。sticky + useTransform 实现，Awwwards 站常见。'
          />
          <HorizontalScroll />
        </section>

        <div className={styles.divider} />

        {/* 4 */}
        <section className={styles.demoSection} id='fx-04'>
          <DemoHeader
            num='04'
            cat='Entrance'
            title='Text Cascade'
            desc='逐字符 3D 翻转入场，每个字母依次从下方翻起。品牌标语页的杀手级效果。'
          />
          <div className={styles.demoBox}>
            <TextCascade />
          </div>
        </section>

        <div className={styles.divider} />

        {/* 5 */}
        <section className={styles.demoSection} id='fx-05'>
          <DemoHeader
            num='05'
            cat='Interactive'
            title='Magnetic Hover'
            desc='按钮被鼠标吸引，带弹性地跟随光标移动。鼠标移开自动归位。高端 CTA 标配。'
          />
          <div className={styles.demoBox}>
            <MagneticHover />
          </div>
        </section>

        <div className={styles.divider} />

        {/* 6 */}
        <section className={styles.demoSection} id='fx-06'>
          <DemoHeader
            num='06'
            cat='Data'
            title='Number Odometer'
            desc='数字从 0 滚动到目标值，进入视口时触发。用数据作为视觉锤，增强说服力。'
          />
          <div className={styles.demoBox}>
            <NumberOdometer />
          </div>
        </section>

        <div className={styles.divider} />

        {/* 7 */}
        <section className={styles.demoSection} id='fx-07'>
          <DemoHeader
            num='07'
            cat='Visual'
            title='Gradient Mesh'
            desc='多个高斯模糊色球叠加浮动，形成流体渐变背景。SaaS 官网的氛围担当。'
          />
          <div className={styles.demoBox}>
            <GradientMesh />
          </div>
        </section>

        <div className={styles.divider} />

        {/* 8 */}
        <section className={styles.demoSection} id='fx-08'>
          <DemoHeader
            num='08'
            cat='Scroll-Driven'
            title='Sticky Stack'
            desc='卡片在 sticky 容器中堆叠，随滚动逐张偏移旋转。模拟物理堆叠感。'
          />
          <StickyStack />
        </section>

        <div className={styles.divider} />

        {/* 9 */}
        <section className={styles.demoSection} id='fx-09'>
          <DemoHeader
            num='09'
            cat='Visual'
            title='Text Mask Window'
            desc='文字作为透明遮罩，露出底层图片。背景文字 + 缩放动效，视觉冲击力强。'
          />
          <div className={styles.demoBox}>
            <TextMaskWindow />
          </div>
        </section>

        <div className={styles.divider} />

        {/* 10 */}
        <section className={styles.demoSection} id='fx-10'>
          <DemoHeader
            num='10'
            cat='Entrance'
            title='Staggered Grid Reveal'
            desc='网格项逐个交错入场，带缩放和位移。作品集/服务展示的标配动画。'
          />
          <div className={styles.demoBox}>
            <StaggeredGrid />
          </div>
        </section>

        <div className={styles.divider} />

        {/* 11 */}
        <section className={styles.demoSection} id='fx-11'>
          <DemoHeader
            num='11'
            cat='Interactive'
            title='Cursor Follower'
            desc='自定义光标跟随，双层弹簧动画 + mix-blend-mode 差值混合。高端品牌站常用。'
          />
          <div className={styles.demoBox}>
            <CursorFollower />
          </div>
        </section>

        <div className={styles.divider} />

        {/* 12 */}
        <section className={styles.demoSection} id='fx-12'>
          <DemoHeader
            num='12'
            cat='Scroll-Driven'
            title='Scale Reveal'
            desc='图片从缩小状态随滚动放大到正常尺寸，配合圆角渐变和透明度。产品展示页常见。'
          />
          <div className={styles.demoBox}>
            <ScaleReveal />
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>12 effects · framer-motion · Scroll-driven + Interactive + Visual + Entrance</p>
        </footer>
      </div>
    </ScrollCtx>
  );
}
