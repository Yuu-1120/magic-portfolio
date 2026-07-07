import { Column, Flex, Heading, Icon, Meta, Schema, Text } from '@once-ui-system/core';
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

// Map category titles to accent class names
const accentMap: Record<string, string> = {
  Games: 'Games',
  Websites: 'Websites',
  Labs: 'Labs'
};

export default function Play() {
  return (
    <Column maxWidth='l' paddingTop='24' paddingX='l' style={{ minHeight: '120vh' }}>
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

      {/* Header */}
      <Column gap='8' marginBottom='48' align='center'>
        <Heading variant='heading-strong-xl' align='center'>
          {play.title}
        </Heading>
        <Text variant='body-default-m' onBackground='neutral-weak' align='center'>
          {play.description}
        </Text>
      </Column>

      {/* Category Sections */}
      {play.categories.map(category => {
        const accent = accentMap[category.title] || '';
        return (
          <Column key={category.title} gap='24' marginBottom='48'>
            {/* Category Header */}
            <Flex gap='12' vertical='center'>
              {category.icon && <Icon name={category.icon as any} size='m' />}
              <Heading variant='heading-strong-l'>{category.title}</Heading>
              <Text variant='body-default-s' onBackground='neutral-weak'>
                {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
              </Text>
            </Flex>

            {/* Bento Grid */}
            <Flex fillWidth gap='16' wrap>
              {category.items.map(item => (
                <Column
                  key={item.name}
                  style={{
                    flex: item.size === 'large' ? '1 1 100%' : item.size === 'medium' ? '1 1 45%' : '1 1 30%',
                    maxWidth: item.size === 'large' ? '100%' : item.size === 'medium' ? '560px' : '360px'
                  }}
                >
                  <PlayCard item={item} accent={accent} />
                </Column>
              ))}
            </Flex>
          </Column>
        );
      })}
    </Column>
  );
}
