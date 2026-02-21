import * as React from 'react'
import './Icon.css';

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
    const colorClass = color ? `icon-color-${color}` : '';
    const classes = `icon ${colorClass} ${className}`.trim();
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
    )
}

export default Icon;
