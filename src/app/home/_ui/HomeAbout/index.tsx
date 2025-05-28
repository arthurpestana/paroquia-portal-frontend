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
                        <Image 
                            src={img.src} 
                            key={idx} 
                            alt='Image' 
                            width={250} 
                            height={Number(img.heigth)}
                            style={{marginTop: img.margin}}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}