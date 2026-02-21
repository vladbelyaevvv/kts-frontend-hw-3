import * as React from 'react'
import './Text.css';

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({
    className = '',
    view,
    tag = 'p',
    weight,
    children,
    color,
    maxLines,
}) => {
    const Tag = tag;
    let textClass = 'text';

    if(weight === 'normal'){
        textClass = 'text-normal';
    } else if (weight === 'medium'){
        textClass = 'text-medium';
    } else if (weight === 'bold') {
        textClass = 'text-bold';
    } else if (view){
        switch(view){
            case 'title': textClass = 'text-title'; break;
            case 'button': textClass = 'text-button'; break;
            case 'p-20': textClass = 'text-p-20'; break;
            case 'p-18': textClass = 'text-p-18'; break;
            case 'p-16': textClass = 'text-p-16'; break;
            case 'p-14': textClass = 'text-p-14'; break;
        }
    }
    const colorClass = color ? `text-color-${color}` : '';
    const style = maxLines ? {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden'
    } : undefined;
    const classes = `${textClass} ${colorClass} ${className}`.trim();
    return (
        <Tag className={`${classes}`} style={style}>
            {children}
        </Tag>
    )
};

export default Text;
