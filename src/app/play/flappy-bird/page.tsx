import { Column, Heading, Meta, Schema, Text } from '@once-ui-system/core';
import { baseURL, about, person } from '@/resources';
import FlappyBird from '@/components/play/FlappyBird';

export async function generateMetadata() {
  return Meta.generate({
    title: 'Flappy Bird – Yuu',
    description: 'A classic Flappy Bird clone built with React and Canvas.',
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent('Flappy Bird')}`,
    path: '/play/flappy-bird'
  });
}

export default function FlappyBirdPage() {
  return (
    <Column maxWidth='m' paddingTop='24' paddingX='l' style={{ minHeight: '120vh' }}>
      <Schema
        as='webPage'
        baseURL={baseURL}
        path='/play/flappy-bird'
        title='Flappy Bird – Yuu'
        description='A classic Flappy Bird clone built with React and Canvas.'
        image={`/api/og/generate?title=${encodeURIComponent('Flappy Bird')}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`
        }}
      />

      <Column gap='8' marginBottom='24' align='center'>
        <Heading variant='heading-strong-xl' align='center'>
          Flappy Bird
        </Heading>
        <Text variant='body-default-m' onBackground='neutral-weak' align='center'>
          Tap, click, or press Space to fly. Avoid the pipes!
        </Text>
      </Column>

      <FlappyBird />
    </Column>
  );
}
