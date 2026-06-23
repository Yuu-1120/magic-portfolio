import { notFound } from 'next/navigation';
import { getPosts } from '@/utils/utils';
import { CustomMDX, ScrollToHash } from '@/components';
import { Meta, Column, Heading, Icon, Row, Tag, Text, SmartLink, Line, Button } from '@once-ui-system/core';
import { baseURL, uses, person } from '@/resources';
import { Metadata } from 'next';
import { UsesItem } from '@/types';

const ITEMS_DIR = ['src', 'app', 'uses', 'items'];

// Find the uses item config by slug
function findUsesItem(slug: string): (UsesItem & { category: string }) | undefined {
  for (const category of uses.categories) {
    const item = category.items.find(i => i.slug === slug);
    if (item) return { ...item, category: category.title };
  }
  return undefined;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(ITEMS_DIR);
  return posts.map(post => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(ITEMS_DIR);
  const post = posts.find(p => p.slug === slugPath);
  const item = findUsesItem(slugPath);

  if (!post && !item) return {};

  return Meta.generate({
    title: post?.metadata.title || item?.name || '',
    description: post?.metadata.summary || '',
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(post?.metadata.title || item?.name || '')}`,
    path: `${uses.path}/${slugPath}`
  });
}

export default async function UsesDetail({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(ITEMS_DIR);
  const post = posts.find(p => p.slug === slugPath);
  const item = findUsesItem(slugPath);

  if (!post && !item) {
    notFound();
  }

  const title = post?.metadata.title || item?.name || '';
  const subtitle = post?.metadata.subtitle || '';
  const hasMDX = post && post.content.trim().length > 0;

  // Find sibling items for "More in category" section
  const category = uses.categories.find(c => c.items.some(i => i.slug === slugPath));
  const siblingItems = category?.items.filter(i => i.slug !== slugPath).slice(0, 3) || [];

  return (
    <Column as='section' maxWidth='m' horizontal='center' gap='l' paddingTop='l'>
      {/* Breadcrumb */}
      <Column maxWidth='s' gap='16' horizontal='center' align='center'>
        <SmartLink href='/uses'>
          <Text variant='label-strong-m'>Uses</Text>
        </SmartLink>
        {item?.category && <Tag size='l'>{item.category}</Tag>}
        <Heading variant='display-strong-m'>{title}</Heading>
        {subtitle && (
          <Text variant='body-default-l' onBackground='neutral-weak' align='center' style={{ fontStyle: 'italic' }}>
            {subtitle}
          </Text>
        )}
      </Column>

      {/* Meta row */}
      <Row marginBottom='24' horizontal='center'>
        <Row gap='16' vertical='center' wrap horizontal='center'>
          {item?.icon && (
            <Row
              minWidth='40'
              minHeight='40'
              horizontal='center'
              vertical='center'
              background='brand-alpha-weak'
              radius='m'
            >
              <Icon name={item.icon} size='l' onBackground='brand-strong' />
            </Row>
          )}
          {item?.tags?.map(tag => (
            <Tag key={tag} size='l'>
              {tag}
            </Tag>
          ))}
          {item?.link && (
            <Button href={item.link} size='s' variant='secondary' suffixIcon='arrowUpRight' label='Visit' />
          )}
        </Row>
      </Row>

      {/* MDX Content */}
      {hasMDX && (
        <Column as='article' maxWidth='s' fillWidth>
          <CustomMDX source={post.content} />
        </Column>
      )}

      {/* Fallback if no MDX */}
      {!hasMDX && item && (
        <Column as='article' maxWidth='s' fillWidth gap='m'>
          <Text variant='body-default-l' onBackground='neutral-medium'>
            {item.description}
          </Text>
          {item.link && (
            <Button href={item.link} variant='primary' suffixIcon='arrowUpRight' label={`Visit ${item.name}`} />
          )}
        </Column>
      )}

      {/* More in this category */}
      {siblingItems.length > 0 && (
        <Column fillWidth gap='l' horizontal='center' marginTop='40'>
          <Line maxWidth='40' />
          <Text as='h2' variant='heading-strong-l' marginBottom='8'>
            More in {category?.title}
          </Text>
          <Column fillWidth gap='s'>
            {siblingItems.map(sibling => (
              <SmartLink key={sibling.slug} href={`/uses/${sibling.slug}`}>
                <Row
                  fillWidth
                  padding='m'
                  gap='m'
                  vertical='center'
                  background='surface'
                  border='neutral-alpha-weak'
                  radius='l'
                >
                  {sibling.icon && (
                    <Row
                      minWidth='40'
                      minHeight='40'
                      horizontal='center'
                      vertical='center'
                      background='brand-alpha-weak'
                      radius='m'
                    >
                      <Icon name={sibling.icon} size='l' onBackground='brand-strong' />
                    </Row>
                  )}
                  <Column fillWidth flex={1}>
                    <Text variant='heading-strong-s'>{sibling.name}</Text>
                    <Text variant='body-default-xs' onBackground='neutral-weak'>
                      {sibling.description}
                    </Text>
                  </Column>
                  <Icon name='arrowRight' size='s' onBackground='neutral-weak' />
                </Row>
              </SmartLink>
            ))}
          </Column>
        </Column>
      )}

      <ScrollToHash />
    </Column>
  );
}
