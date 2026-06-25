'use client';

import { Column, Flex, Icon, SmartLink, Tag, Text } from '@once-ui-system/core';
import { PlayItem } from '@/types';
import styles from './PlayCard.module.scss';

interface PlayCardProps {
  item: PlayItem;
  accent?: string;
}

const statusLabel: Record<string, string> = {
  live: 'Live',
  wip: 'WIP',
  planned: 'Planned'
};

export const PlayCard: React.FC<PlayCardProps> = ({ item, accent }) => {
  const sizeClass = item.size || 'medium';
  const accentClass = accent ? `accent${accent}` : '';

  const cardContent = (
    <Column fillWidth gap='12' className={styles[sizeClass]}>
      {/* Icon */}
      {item.icon && (
        <div className={`${styles.iconArea} ${accent ? styles[accentClass] : ''}`}>
          <Icon name={item.icon as any} size='l' />
        </div>
      )}

      {/* Name + Status */}
      <Flex horizontal='between' vertical='center'>
        <Text variant='heading-strong-l'>{item.name}</Text>
        {item.status && (
          <div className={`${styles.statusDot} ${styles[item.status]}`} title={statusLabel[item.status]} />
        )}
      </Flex>

      {/* Description */}
      <Text variant='body-default-s' onBackground='neutral-weak' style={{ flex: 1 }}>
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
      <SmartLink href={item.link} style={{ textDecoration: 'none', display: 'block' }}>
        <div className={`${styles.playCard} ${styles[sizeClass]} ${accent ? styles[accentClass] : ''}`}>
          {cardContent}
        </div>
      </SmartLink>
    );
  }

  return (
    <div className={`${styles.playCard} ${styles[sizeClass]} ${accent ? styles[accentClass] : ''}`}>{cardContent}</div>
  );
};
