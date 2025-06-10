import React from 'react';
import styles from './EventCard.module.scss'
import { formatFullDate, formatTime } from '@/lib/utils/stringUtils';

type EventCardProps = {
    title?: string;
    subtitle?: string;
    location?: string;
    date: number;
    description?: string;
    time: {
        startTime: number;
        endTime: number;
    }
}

export const EventCard = ({ title, subtitle, location, date, description, time }: EventCardProps) => {
    return (
        <div className={styles.eventCard__content}>
            <div className={styles.eventCard__content__header}>
                <h4>{subtitle || 'Evento'}</h4>
                <h2>{title}</h2>
            </div>
            <div className={styles.eventCard__content__body}>
                <p>{description}</p>
            </div>
            <div className={styles.eventCard__content__footer}>
                <span className={styles.eventCard__content__footer__location}>{location}</span>
                <span className={styles.eventCard__content__footer__date}>{formatFullDate(date)}</span>
                <span className={styles.eventCard__content__footer__date}>{formatTime(time.startTime)} à {formatTime(time.endTime)}</span>
            </div>
        </div>
    )
}