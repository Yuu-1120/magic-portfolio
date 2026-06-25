'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';

import { Fade, Flex, Line, Row, ToggleButton } from '@once-ui-system/core';
import gsap from 'gsap';

import { routes, display, person, about, blog, work, gallery, uses, now, play } from '@/resources';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.scss';

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = 'en-GB' }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{currentTime}</span>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? '';
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setButtonRef = useCallback(
    (key: string) => (el: HTMLDivElement | null) => {
      if (el) {
        buttonRefs.current.set(key, el);
      } else {
        buttonRefs.current.delete(key);
      }
    },
    []
  );

  // Find which route key matches the current pathname
  const getActiveKey = useCallback(() => {
    if (pathname === '/') return '/';
    if (pathname.startsWith('/about')) return '/about';
    if (pathname.startsWith('/work')) return '/work';
    if (pathname.startsWith('/blog')) return '/blog';
    if (pathname.startsWith('/gallery')) return '/gallery';
    if (pathname.startsWith('/uses')) return '/uses';
    if (pathname.startsWith('/now')) return '/now';
    if (pathname.startsWith('/play')) return '/play';
    return '/';
  }, [pathname]);

  useEffect(() => {
    const activeKey = getActiveKey();
    const activeEl = buttonRefs.current.get(activeKey);
    const indicator = indicatorRef.current;
    const nav = navRef.current;

    if (activeEl && indicator && nav) {
      requestAnimationFrame(() => {
        const navRect = nav.getBoundingClientRect();
        const btnRect = activeEl.getBoundingClientRect();
        const x = btnRect.left - navRect.left;
        const y = btnRect.top - navRect.top;

        // Use transform only — no layout-triggering width/height
        indicator.style.width = `${btnRect.width}px`;
        indicator.style.height = `${btnRect.height}px`;

        gsap.to(indicator, {
          x,
          y,
          duration: 0.45,
          ease: 'power3.out',
          opacity: 1,
          overwrite: true
        });
      });
    }
  }, [pathname, getActiveKey]);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position='fixed' height='80' zIndex={9} />
      <Fade hide s={{ hide: false }} fillWidth position='fixed' bottom='0' to='top' height='80' zIndex={9} />
      <Row
        fitHeight
        className={styles.position}
        position='sticky'
        as='header'
        zIndex={9}
        fillWidth
        padding='8'
        horizontal='center'
        data-border='rounded'
        s={{
          position: 'fixed'
        }}
      >
        <Row paddingLeft='12' vertical='center' textVariant='body-default-s'>
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal='center'>
          <Row className={styles.glassNav} radius='m-4' padding='8' horizontal='center' zIndex={1} ref={navRef}>
            <div ref={indicatorRef} className={styles.indicator} />
            <Row gap='2' vertical='center' textVariant='body-default-s' suppressHydrationWarning>
              {routes['/'] && (
                <div ref={setButtonRef('/')}>
                  <ToggleButton prefixIcon='home' href='/' />
                </div>
              )}
              <Line background='neutral-alpha-medium' vert maxHeight='24' />
              {routes['/about'] && (
                <div ref={setButtonRef('/about')}>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon='person' href='/about' label={about.label} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon='person' href='/about' />
                  </Row>
                </div>
              )}
              {routes['/work'] && (
                <div ref={setButtonRef('/work')}>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon='grid' href='/work' label={work.label} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon='grid' href='/work' />
                  </Row>
                </div>
              )}
              {routes['/blog'] && (
                <div ref={setButtonRef('/blog')}>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon='book' href='/blog' label={blog.label} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon='book' href='/blog' />
                  </Row>
                </div>
              )}
              {routes['/gallery'] && (
                <div ref={setButtonRef('/gallery')}>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon='gallery' href='/gallery' label={gallery.label} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon='gallery' href='/gallery' />
                  </Row>
                </div>
              )}
              {routes['/uses'] && (
                <div ref={setButtonRef('/uses')}>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon='uses' href='/uses' label={uses.label} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon='uses' href='/uses' />
                  </Row>
                </div>
              )}
              {routes['/now'] && (
                <div ref={setButtonRef('/now')}>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon='clock' href='/now' label={now.label} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon='clock' href='/now' />
                  </Row>
                </div>
              )}
              {routes['/play'] && (
                <div ref={setButtonRef('/play')}>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon='gamepad' href='/play' label={play.label} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon='gamepad' href='/play' />
                  </Row>
                </div>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background='neutral-alpha-medium' vert maxHeight='24' />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex horizontal='end' vertical='center'>
          <Flex paddingRight='12' horizontal='end' vertical='center' textVariant='body-default-s' gap='20'>
            <Flex s={{ hide: true }}>{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
