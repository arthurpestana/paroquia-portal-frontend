import React from 'react';
import styles from './TimelineItem.module.scss';
import { Button } from '@/components/comp/Button';
import { useRouter } from 'next/navigation';
import { AccessTimeOutlined, ChevronRight, LocationOnOutlined } from '@mui/icons-material';
import { TimelineItemData } from '@/lib/types/TimelineItemData';
import { getMonthName } from '@/lib/utils/stringUtils';
import { useScreenSize } from '@/context/ScreenSizeContext';

type TimelineItemProps = TimelineItemData;

export const TimelineItem = ({ date, title, location, time, id }: TimelineItemProps) => {
    const { isMobile } = useScreenSize();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/events?id=${id}`);
    };

    return (
        <div
            className={styles.timelineItem__content}
            onClick={isMobile ? handleClick : undefined}
        >
            <div className={styles.timelineItem__content__left}>
                <div className={styles.timelineItem__content__date}>
                    <h3>{date.day}</h3>
                    <div className={styles.timelineItem__content__date__days}>
                        <span>{getMonthName(Number(date.month))}</span>
                        <span>{date.year}</span>
                    </div>
                </div>
                <div className={styles.timelineItem__content__info}>
                    <h4>{title}</h4>
                    <div className={styles.timelineItem__content__info__text}>
                        <span><LocationOnOutlined />{location}</span>
                        <span><AccessTimeOutlined />{time}</span>
                    </div>
                </div>
            </div>
            <div className={styles.timelineItem__content__button}>
                <div className={styles.timelineItem__content__button__default}>
                    <Button
                        variant='contained'
                        label='Ver mais'
                        onClick={handleClick}
                    />
                </div>
                <div className={styles.timelineItem__content__button__chevron}>
                    <Button
                        variant='text'
                        icon={<ChevronRight />}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>
    );
};
