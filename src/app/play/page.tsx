import { Column, Flex, Heading, Meta, Schema, Text } from '@once-ui-system/core';
import { baseURL, about, person, play } from '@/resources';
import { PlayCard } from '@/components/play/PlayCard';

export async function generateMetadata() {
  return Meta.generate({
    title: play.title,
    description: play.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(play.title)}`,
    path: play.path
  });
}

export default function Play() {
  return (
    <Column maxWidth='m' paddingTop='24' paddingX='l'>
      <Schema
        as='webPage'
        baseURL={baseURL}
        path={play.path}
        title={play.title}
        description={play.description}
        image={`/api/og/generate?title=${encodeURIComponent(play.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`
        }}
      />
      <Heading marginBottom='8' variant='heading-strong-xl' align='center'>
        {play.title}
      </Heading>
      <Text marginBottom='40' variant='body-default-m' onBackground='neutral-weak' align='center'>
        {play.description}
      </Text>

      <Flex fillWidth gap='16' wrap>
        {play.items.map(item => (
          <Column key={item.name} style={{ flex: '1 1 320px', maxWidth: '480px' }}>
            <PlayCard item={item} />
          </Column>
        ))}
      </Flex>
    </Column>
  );
}
