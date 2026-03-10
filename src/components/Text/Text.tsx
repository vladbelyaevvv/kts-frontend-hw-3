'use client';

import * as React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = React.memo(
  ({ className = '', view, tag = 'p', weight, children, color, maxLines }) => {
    const Tag = tag;
    let textClass = styles.text;

    if (weight === 'normal') {
      textClass = styles['text--normal'];
    } else if (weight === 'medium') {
      textClass = styles['text--medium'];
    } else if (weight === 'bold') {
      textClass = styles['text--bold'];
    } else if (view) {
      switch (view) {
        case 'title':
          textClass = styles['text--title'];
          break;
        case 'button':
          textClass = styles['text--button'];
          break;
        case 'p-20':
          textClass = styles['text--p-20'];
          break;
        case 'p-18':
          textClass = styles['text--p-18'];
          break;
        case 'p-16':
          textClass = styles['text--p-16'];
          break;
        case 'p-14':
          textClass = styles['text--p-14'];
          break;
      }
    }
    const colorClass = color ? styles[`text--color-${color}`] : '';
    const style = maxLines
      ? {
          display: '-webkit-box',
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }
      : undefined;
    const classes = classNames(textClass, colorClass, className);
    return (
      <Tag className={classes} style={style}>
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';

export default Text;
