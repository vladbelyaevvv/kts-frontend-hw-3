import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import './CheckBox.css'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  className?: string;
  
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  disabled,
  onChange,
  className = '',
  ...props
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label className={`checkbox-wrapper ${disabled ? 'disabled' : ''} ${className}`}>

      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className='checkbox-input'
        {...props}
      />
      <div className="checkbox">
        {checked && <CheckIcon width={48} height={48} color={disabled ? 'secondary' : "accent"}/>}
      </div>
    </label>
  )
};

export default CheckBox;
