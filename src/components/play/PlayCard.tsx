'use client';

import { Column, Flex, Icon, SmartLink, Tag, Text } from '@once-ui-system/core';
import { PlayItem } from '@/types';
import styles from './PlayCard.module.scss';

interface PlayCardProps {
  item: PlayItem;
}

const statusLabel: Record<string, string> = {
  live: 'Live',
  wip: 'WIP',
  planned: 'Planned'
};

export const PlayCard: React.FC<PlayCardProps> = ({ item }) => {
  const cardContent = (
    <Column fillWidth gap='12'>
      {/* Icon + Name */}
      <Flex horizontal='between' vertical='center'>
        <Flex gap='12' vertical='center'>
          {item.icon && <Icon name={item.icon as any} size='l' />}
          <Text variant='heading-strong-m'>{item.name}</Text>
        </Flex>
        {item.status && (
          <div className={`${styles.statusDot} ${styles[item.status]}`} title={statusLabel[item.status]} />
        )}
      </Flex>

      {/* Description */}
      <Text variant='body-default-s' onBackground='neutral-weak'>
        {item.description}
      </Text>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <Flex gap='8' wrap>
          {item.tags.map(tag => (
            <Tag key={tag} label={tag} size='s' />
          ))}
        </Flex>
      )}
    </Column>
  );

  if (item.link) {
    return (
      <SmartLink href={item.link} style={{ textDecoration: 'none' }}>
        <div className={styles.playCard}>{cardContent}</div>
      </SmartLink>
    );
  }

  return <div className={styles.playCard}>{cardContent}</div>;
};
