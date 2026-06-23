import { Column, Heading, Row, Text, Meta, Schema, SmartLink } from '@once-ui-system/core';
import { baseURL, now, person } from '@/resources';
import { NowContent } from './NowContent';

export async function generateMetadata() {
  return Meta.generate({
    title: now.title,
    description: now.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(now.title)}`,
    path: now.path
  });
}

export default function Now() {
  return (
    <Column maxWidth='m'>
      <Schema
        as='webPage'
        baseURL={baseURL}
        title={now.title}
        description={now.description}
        path={now.path}
        image={`/api/og/generate?title=${encodeURIComponent(now.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${now.path}`,
          image: `${baseURL}${person.avatar}`
        }}
      />

      {/* Header */}
      <Column fillWidth gap='l' marginBottom='xl'>
        <Row fillWidth horizontal='between' vertical='end'>
          <Heading variant='display-strong-xl'>Now</Heading>
          <Row gap='8' vertical='center'>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'var(--accent-on-background-strong)',
                display: 'inline-block'
              }}
            />
            <Text variant='body-default-s' onBackground='neutral-weak'>
              Updated {now.updatedAt}
            </Text>
          </Row>
        </Row>
        <Text variant='body-default-l' onBackground='neutral-weak'>
          What I'm currently working on, learning, and interested in.
        </Text>
      </Column>

      {/* Entries — client component with GSAP animations */}
      <NowContent />

      {/* Footer note */}
      <Column fillWidth gap='m' marginTop='xl' paddingTop='xl' borderTop='neutral-alpha-weak'>
        <Text variant='body-default-s' onBackground='neutral-weak'>
          This page follows the{' '}
          <SmartLink href='https://nownownow.com' style={{ textDecoration: 'none' }}>
            <Text variant='body-default-s' onBackground='brand-weak' weight='strong'>
              /now page movement
            </Text>
          </SmartLink>{' '}
          — a way to share what you're focused on right now.
        </Text>
      </Column>
    </Column>
  );
}
