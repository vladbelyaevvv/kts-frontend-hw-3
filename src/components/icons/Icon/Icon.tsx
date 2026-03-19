'use client';

import * as React from 'react';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className = '',
  color,
  width = 24,
  height = 24,
  children, //svg содержимое иконок
  ...props
}) => {
  const colorClass = color ? styles[`icon--color-${color}`] : '';
  const classes = `${styles.icon} ${colorClass} ${className}`.trim();
  return (
    <svg
      className={classes}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...props}
      fill="none"
    >
      {children}
    </svg>
  );
};

export default Icon;
