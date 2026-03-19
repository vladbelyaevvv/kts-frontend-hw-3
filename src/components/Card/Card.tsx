'use client';

import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './Card.module.scss';
import Text from '../Text';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Рейтинг товара */
  rating?: number;
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
    rating,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot,
  }) => {
    return (
      <div className={classNames(styles.card, className)} onClick={onClick}>
        <div className={styles['card__image-wrapper']}>
        <Image
          src={image} 
          alt="card-image" 
          className={styles.card__image}
          width={348}
          height={348}
        />
        {rating !== undefined && (
            <div className={styles['card__rating']}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L8.854 4.756L13 5.364L10 8.292L10.708 12.42L7 10.47L3.292 12.42L4 8.292L1 5.364L5.146 4.756L7 1Z" />
              </svg>
              <span>{rating}</span>
            </div>
          )
        }
      </div>

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

Card.displayName = 'Card';

export default Card;
