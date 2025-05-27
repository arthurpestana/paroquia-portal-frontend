'use client';

import React from 'react';
import styles from './HomeBanner.module.scss';
import { Button } from '@/components/comp/Button';
import HomeInfo from "@/lib/data/home/bannerInfo.json"

export const HomeBanner = () => {
    return (
        <div className={styles.banner__content}>
            <div className={styles.banner__content__main}>
                <div className={styles.banner__content__main__information}>
                    <h3>{HomeInfo.above}</h3>
                    <h1>{HomeInfo.title}</h1>
                    <p>{HomeInfo.description}</p>
                </div>
                <div className={styles.banner__content__main__button}>
                    <Button 
                        variant='contained'
                        label='Inscreva-se'
                        onClick={() => window.open(HomeInfo.link, '_blank', 'noopener, noreferrer')}
                        darkMode={true}
                    />
                </div>
            </div>
        </div>
    )
}