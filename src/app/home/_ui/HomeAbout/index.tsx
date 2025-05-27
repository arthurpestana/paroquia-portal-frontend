import React from 'react';
import styles from './HomeAbout.module.scss';
import { SectionTitle } from '@/components/comp/SectionTitle';
import Image from 'next/image';
import aboutUs from "@/lib/data/home/aboutUsInfo.json";

export const HomeAbout = () => {
    return (
        <div className={styles.aboutUs__content} id='aboutUs'>
            <div className={styles.aboutUs__content__image}>
                <Image 
                    src='/images/aboutUs-image.png'
                    alt='Sobre nós'
                    width={450}
                    height={350}
                    objectFit='cover'
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>
            <div className={styles.aboutUs__content__main}>
                <SectionTitle
                    title='Tec inclusão'
                    subtitle='Sobre nós'
                    align='flex-start'
                />
                <div className={styles.aboutUs__content__main__text}>
                    <p>{aboutUs.description}</p>
                </div>
                <div className={styles.aboutUs__content__main__eventsQuant}>
                    <div className={styles.aboutUs__content__main__eventsQuant__Count}>
                        <span>+3</span>
                    </div>
                    <span>Atividades</span>
                </div>
            </div>
        </div>
    )
}