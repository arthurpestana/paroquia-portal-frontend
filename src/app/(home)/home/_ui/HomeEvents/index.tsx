import React from 'react';
import styles from './HomeEvents.module.scss';
import { SectionTitle } from '@/components/comp/SectionTitle';
import { useNextEvents } from '@/hooks/useNextEvents';

export const HomeEvents = () => {
    const { events, loading, error } = useNextEvents()
    console.log(events, loading, error);

    // const cards = Array.from({ length: 5 }, (_, i) => ({
    //     id: i + 1,
    //     content: <div style={{ padding: 20, background: '#eee', borderRadius: 10 }}>Card {i + 1}</div>,
    // }));

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
                {/* <SliderCards cards={cards} /> */}
            </div>
        </div>
    )
}