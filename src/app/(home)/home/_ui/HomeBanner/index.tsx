'use client';

import React from 'react';
import styles from './HomeBanner.module.scss';
import { Button } from '@/components/comp/Button';
import HomeInfo from "@/lib/data/home/bannerInfo.json"

export const HomeBanner = () => {
    return (
        <div className={styles.banner_content}>
            <div className={styles.banner_content_main}>
                <div className={styles.banner_content_main_information}>
                    <h3>{HomeInfo.above}</h3>
                    <h1>{HomeInfo.title}</h1>
                    <p>{HomeInfo.description}</p>
                </div>
                <div className={styles.banner_content_main_button}>
                    <Button 
                        variant='contained'
                        label='Saiba Mais'
                        darkMode={false}
                    />
                </div>
            </div>
        </div>
    )
}