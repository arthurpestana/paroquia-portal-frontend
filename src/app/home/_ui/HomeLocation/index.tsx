import React from 'react';
import styles from './HomeLocation.module.scss'    
import { SectionTitle } from '@/components/comp/SectionTitle';
import { useScreenSize } from '@/context/ScreenSizeContext';
import { MapFrame } from '@/components/comp/MapFrame';

export const HomeLocation = () => {
    const { isMobile } = useScreenSize();

    return (
        <div className={styles.homeLocation__content} id='location'>
            <div className={styles.homeLocation__content__information}>
                <SectionTitle
                    title="Localização"
                    subtitle="Encontre-nos aqui"
                    align={isMobile ? "center" : "flex-start"}
                />
                <p>O evento será realizado no Campus Palmas da UNITINS — Universidade Estadual do Tocantins, um espaço preparado para receber todos os participantes com conforto e acessibilidade. Esperamos por você!</p>
            </div>
            <div className={styles.homeLocation__content__map}>
                <MapFrame/>
            </div>
        </div>
    )
}