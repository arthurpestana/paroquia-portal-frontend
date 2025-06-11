import React from 'react';
import styles from './HomeEvents.module.scss';
import { SectionTitle } from '@/components/comp/SectionTitle';
import { SliderCards } from '@/components/comp/SliderCards';
import { EventCard } from './EventCard';
import { useActiveEvents } from '@/hooks/useActiveEvents';

export const HomeEvents = () => {
    const { events, loading, error } = useActiveEvents()
    console.log(events, loading, error);

    return (
        <div className={styles.homeEvents__content} id='events'>
            <div className={styles.homeEvents__content__header}>
                <SectionTitle
                    title="Eventos e Programações"
                    subtitle='Novidades'
                    align='center'
                />
            </div>
            <div className={styles.homeEvents__content__body}>
                <SliderCards>
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <EventCard
                            key={idx}
                            title="Carregando..."
                            description="Aguarde enquanto os eventos são carregados."
                            location="Carregando localização..."
                            date={Date.now()}
                            time={{
                                startTime: Date.now(),
                                endTime: Date.now() + 3600000
                            }}
                        />
                    ))}
                    {/* {events.map((event, idx) => (
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
                    ))} */}
                </SliderCards>
            </div>
        </div>
    )
}