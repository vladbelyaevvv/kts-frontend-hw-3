import React from 'react';
import classNames from 'classnames';
import './Button.css';
import Loader from "../Loader"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  disabled?: boolean
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled = false,
  className= '',
  children,
  ...props
}) => {
  const classes = classNames('button', className, {
      'button-loading': loading,
      'button-disabled': disabled,
    }
  );

  return (
    <button className={classes} disabled={loading || disabled}  {...props}>
      {loading ? (
        <>
          <Loader size="s" color="#FFFFFF"/>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
};

export default Button;
