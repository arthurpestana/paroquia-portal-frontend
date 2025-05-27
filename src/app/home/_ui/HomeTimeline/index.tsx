import React from 'react';
import styles from './HomeTimeline.module.scss';
import { SectionTitle } from '@/components/comp/SectionTitle';
import events from '@/lib/data/eventsTimeline.json';
import { TimelineItem } from './TimelineItem';

export const HomeTimeline = () => {
    return (
        <div className={styles.homeTimeline__content} id='timeline'>
            <SectionTitle title="Lista de Atividades Planejadas" subtitle="Cronograma do Evento" align="center" />
            <div className={styles.homeTimeline__content__list}>
                {events.map((event, index) => (
                    <TimelineItem 
                        key={index}
                        id={event.id.toString()}
                        title={event.title}
                        location={event.location}
                        date={event.date}
                        time={event.time}
                    />
                ))}
            </div>
        </div>
    )
}