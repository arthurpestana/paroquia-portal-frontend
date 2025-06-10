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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis recusandae iure distinctio similique. Quis provident animi fugiat rem tempora iste ea maxime similique at hic consequatur, beatae qui voluptate quidem.</p>
            </div>
            <div className={styles.homeLocation__content__map}>
                <MapFrame/>
            </div>
        </div>
    )
}