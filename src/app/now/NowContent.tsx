'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Column, Icon, Row, Text, Tag, SmartLink } from '@once-ui-system/core';
import { now } from '@/resources';

const statusConfig = {
  active: { label: 'Active', dot: 'var(--accent-on-background-strong)' },
  paused: { label: 'Paused', dot: 'var(--neutral-on-background-weak)' },
  completed: { label: 'Done', dot: 'var(--color-success)' }
};

export function NowContent() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulse dot
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          opacity: 0.3,
          scale: 0.8,
          duration: 1.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      }

      // Staggered card entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('[data-entry-card]');
        gsap.from(cards, {
          y: 40,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Entries */}
      <Column ref={cardsRef} fillWidth gap='l'>
        {now.entries.map((entry, index) => {
          const config = entry.status ? statusConfig[entry.status] : statusConfig.active;

          return (
            <SmartLink
              key={`${entry.category}-${index}`}
              href={entry.link || '#'}
              style={{ textDecoration: entry.link ? 'none' : undefined }}
            >
              <Row
                data-entry-card
                fillWidth
                padding='l'
                gap='m'
                vertical='center'
                background='surface'
                border='neutral-alpha-weak'
                radius='l'
                className='now-card'
                style={{ cursor: entry.link ? 'pointer' : 'default' }}
              >
                {/* Icon */}
                <Row
                  className='now-card-icon'
                  minWidth='48'
                  minHeight='48'
                  horizontal='center'
                  vertical='center'
                  background='brand-alpha-weak'
                  radius='m'
                >
                  <Icon name={(entry.icon as any) || 'sparkle'} size='l' onBackground='brand-strong' />
                </Row>

                {/* Content */}
                <Column fillWidth flex={1} gap='4'>
                  <Row gap='8' vertical='center'>
                    <Text variant='heading-strong-m'>{entry.category}</Text>
                    <Tag size='s' variant='solid' prefixIcon='dot'>
                      {config.label}
                    </Tag>
                  </Row>
                  <Text variant='body-default-s' onBackground='neutral-weak'>
                    {entry.description}
                  </Text>
                </Column>

                {/* Arrow */}
                {entry.link && <Icon name='arrowUpRight' size='s' onBackground='neutral-weak' />}
              </Row>
            </SmartLink>
          );
        })}
      </Column>

      {/* Hover animations */}
      <style>{`
        .now-card {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s ease,
                      border-color 0.3s ease;
        }
        .now-card:hover {
          transform: translateY(-4px);
          border-color: var(--brand-alpha-medium) !important;
          box-shadow: 0 8px 32px -8px var(--brand-alpha-weak);
        }
        .now-card-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      background-color 0.3s ease;
        }
        .now-card:hover .now-card-icon {
          transform: scale(1.1) rotate(-4deg);
          background-color: var(--brand-alpha-medium) !important;
        }
      `}</style>
    </>
  );
}
