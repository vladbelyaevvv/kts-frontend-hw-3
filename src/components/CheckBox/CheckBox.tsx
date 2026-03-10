import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import styles from './CheckBox.module.scss';
import classNames from 'classnames';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  className?: string;
};

const CheckBox: React.FC<CheckBoxProps> = React.memo(
  ({ checked, disabled, onChange, className = '', ...props }) => {
    const handleChange = () => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    return (
      <label
        className={classNames(
          styles.checkbox__wrapper,
          { [styles['checkbox--disabled']]: disabled },
          className
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={styles.checkbox__input}
          {...props}
        />
        <div className={styles.checkbox__box}>
          {checked && (
            <CheckIcon
              width={48}
              height={48}
              color={disabled ? 'secondary' : 'accent'}
            />
          )}
        </div>
      </label>
    );
  }
);

CheckBox.displayName = 'CheckBox';

export default CheckBox;
