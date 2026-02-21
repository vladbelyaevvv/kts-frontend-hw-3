import React from 'react';
import './Card.css';
import Text from '../Text'

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
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

const Card: React.FC<CardProps> = ({
    className,
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot,
}) => {
    return (
        <div className={`card ${className}`} onClick={onClick}>
            <img src={image} alt="card-image" className='card-image'/>
            
            <div className='card-body'>
                {captionSlot && (
                    <Text tag="p" color="secondary" view="p-14">
                            {captionSlot}
                        </Text>
                )}

                {title && (
                    <Text tag="h3" className="card-title" weight="bold" view="p-20" color="primary" maxLines={2}>
                        {title}
                    </Text>
                )}

                {subtitle && (
                    <Text tag="p" className='card-subtitle' color="secondary" view="p-16" maxLines={3}>
                        {subtitle}
                    </Text>
                )}
            </div>

            <div className='card-footer'>
                {contentSlot && (
                    <Text weight="bold" view="p-18" color="primary">
                        {contentSlot}
                    </Text>
                )}
                {actionSlot && <div>{actionSlot}</div>}
            </div>
        </div>
    )
};

export default Card;
