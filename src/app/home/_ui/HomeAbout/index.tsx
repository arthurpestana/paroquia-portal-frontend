import React from 'react';
import styles from './HomeAbout.module.scss';
import { SectionTitle } from '@/components/comp/SectionTitle';
import aboutUs from "@/lib/data/home/aboutUsInfo.json";
import { Button } from '@/components/comp/Button';
import Image from 'next/image';

export const HomeAbout = () => {
    return (
        <div className={styles.aboutUs__content} id='aboutUs'>
            <div className={styles.aboutUs__content__main}>
                <SectionTitle
                    title='Propósitos'
                    subtitle='Sub-Headline'
                    align='center'
                />
                <div className={styles.aboutUs__content__main__text}>
                    <p>{aboutUs.description}</p>
                </div>
                <div className={styles.aboutUs__content__main__button}>
                    <Button
                        label='Saiba Mais'
                        variant='contained'
                        darkMode={false}
                    />
                </div>
                <div className={styles.aboutUs__content__main__image}>
                    {aboutUs.images.map((img, idx) => (
                        <div className={styles.aboutUs__content__main__image__item} key={idx}>
                            <Image 
                                src={img.src}
                                fill
                                style={{objectFit: 'cover'}}
                                alt='Image'
                            />
                        </div>
                    ))}
                </div>
                <SectionTitle
                    title='Comemore Conosco'
                    subtitle='Nossa Missão e Visão'
                    align='center'
                />
                <div className={styles.aboutUs__content__main__text}>
                    <p className={styles.aboutUs__content__main__text__second}>{aboutUs.description}</p>
                </div>
                <div className={styles.aboutUs__content__main__button}>
                    <Button
                        label='Leia Mais'
                        variant='outlined'
                        darkMode={false}
                    />
                </div>
            </div>
        </div>
    )
}