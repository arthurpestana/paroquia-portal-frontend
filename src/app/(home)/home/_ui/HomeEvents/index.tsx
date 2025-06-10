import React from 'react';
import styles from './HomeEvents.module.scss';
import { SectionTitle } from '@/components/comp/SectionTitle';
import { useNextEvents } from '@/hooks/useNextEvents';
import { SliderCards } from '@/components/comp/SliderCards';
import { EventCard } from './EventCard';

export const HomeEvents = () => {
    const { events, loading, error } = useNextEvents()
    console.log(events, loading, error);

    return (
        <div className={styles.homeEvents__content}>
            <div className={styles.homeEvents__content__header}>
                <SectionTitle
                    title="Eventos e Programações"
                    subtitle='Novidades'
                    align='center'
                />
            </div>
            <div className={styles.homeEvents__content__body}>
                <SliderCards>
                    {events.map((event, idx) => (
                        <EventCard
                            key={idx}
                            title={event.title}
                            description={event.description}
                            location={event.location}
                            date={event.date}
                            time={{
                                startTime: event.startTime,
                                endTime: event.endTime
                            }}
                        />
                    ))}
                </SliderCards>
            </div>
        </div>
    )
}