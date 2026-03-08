'use client';

import React from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      afterSlot,
      type = 'text',
      className = '',
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    const wrapperClassNames = classNames(styles['input__wrapper'], className, {
      [styles['input--disabled']]: disabled,
      [styles['input--not-empty']]: value,
      [styles['input-empty']]: !value,
    });

    return (
      <div className={wrapperClassNames}>
        <input
          {...props}
          ref={ref}
          type={type}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={styles['input__element']}
          disabled={disabled}
        ></input>
        {afterSlot && (
          <div className={styles['input__after-slot']}>{afterSlot}</div>
        )}
      </div>
    );
  }
);

export default Input;
