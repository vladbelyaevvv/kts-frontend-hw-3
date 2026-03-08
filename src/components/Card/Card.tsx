'use client';

import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';
import Text from '../Text';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = React.memo(
  ({
    className,
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot,
  }) => {
    return (
      <div className={classNames(styles.card, className)} onClick={onClick}>
        <img src={image} alt="card-image" className={styles.card__image} />

        <div className={styles.card__body}>
          {captionSlot && (
            <Text tag="p" color="secondary" view="p-14">
              {captionSlot}
            </Text>
          )}

          {title && (
            <Text
              tag="h3"
              className={styles.card__title}
              weight="bold"
              view="p-20"
              color="primary"
              maxLines={2}
            >
              {title}
            </Text>
          )}

          {subtitle && (
            <Text
              tag="p"
              className={styles.card__subtitle}
              color="secondary"
              view="p-16"
              maxLines={3}
            >
              {subtitle}
            </Text>
          )}
        </div>

        <div className={styles.card__footer}>
          {contentSlot && (
            <Text tag="span" weight="bold" view="p-18" color="primary">
              {contentSlot}
            </Text>
          )}
          {actionSlot && <div>{actionSlot}</div>}
        </div>
      </div>
    );
  }
);

export default Card;
