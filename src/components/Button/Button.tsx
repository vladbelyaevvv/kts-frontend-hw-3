'use client';

import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import Loader from '../Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  disabled?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = React.memo(
  ({
    loading = false,
    disabled = false,
    className = '',
    children,
    ...props
  }) => {
    const classes = classNames(styles.button, className, {
      [styles['button--loading']]: loading,
      [styles['button--disabled']]: disabled,
    });

    return (
      <button className={classes} disabled={loading || disabled} {...props}>
        {loading ? (
          <>
            <Loader size="s" color="#FFFFFF" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

export default Button;
