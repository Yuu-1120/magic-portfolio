import { Column, Heading, Icon, Meta, Row, SmartLink, Tag, Text } from '@once-ui-system/core';
import { baseURL, uses, person } from '@/resources';

export async function generateMetadata() {
  return Meta.generate({
    title: uses.title,
    description: uses.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(uses.title)}`,
    path: uses.path
  });
}

export default function Uses() {
  return (
    <Column maxWidth='m' fillWidth gap='xl'>
      {/* Page Header */}
      <Column fillWidth gap='s' paddingTop='l'>
        <Heading variant='display-strong-xl'>Uses</Heading>
        <Text variant='body-default-l' onBackground='neutral-weak'>
          A curated collection of the tools, software, and gear I use daily to design, build, and create. Click on any
          item to read more about how I use it.
        </Text>
      </Column>

      {/* Categories */}
      {uses.categories
        .filter(category => category.display)
        .map(category => (
          <Column key={category.title} fillWidth gap='m'>
            {/* Category Title */}
            <Heading as='h2' variant='display-strong-s'>
              {category.title}
            </Heading>

            {/* Items Grid */}
            <Column fillWidth gap='s'>
              {category.items.map(item => (
                <SmartLink key={item.name} href={`/uses/${item.slug}`}>
                  <Row
                    fillWidth
                    padding='m'
                    gap='m'
                    vertical='center'
                    background='surface'
                    border='neutral-alpha-weak'
                    radius='l'
                    style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
                  >
                    {/* Icon */}
                    {item.icon && (
                      <Row
                        minWidth='48'
                        minHeight='48'
                        horizontal='center'
                        vertical='center'
                        background='brand-alpha-weak'
                        radius='m'
                      >
                        <Icon name={item.icon} size='xl' onBackground='brand-strong' />
                      </Row>
                    )}

                    {/* Content */}
                    <Column fillWidth gap='4' flex={1}>
                      <Row gap='8' vertical='center' wrap>
                        <Text variant='heading-strong-m'>{item.name}</Text>
                        {item.tags &&
                          item.tags.map(tag => (
                            <Tag key={tag} size='s'>
                              {tag}
                            </Tag>
                          ))}
                      </Row>
                      <Text variant='body-default-s' onBackground='neutral-weak'>
                        {item.description}
                      </Text>
                    </Column>

                    {/* Arrow indicator */}
                    <Icon name='arrowRight' size='s' onBackground='neutral-weak' />
                  </Row>
                </SmartLink>
              ))}
            </Column>
          </Column>
        ))}
    </Column>
  );
}
