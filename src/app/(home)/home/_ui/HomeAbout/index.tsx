import React from 'react';
import styles from './HomeAbout.module.scss';
import { SectionTitle } from '@/components/comp/SectionTitle';
import aboutUs from "@/lib/data/home/aboutUsInfo.json";
import { Button } from '@/components/comp/Button';
import Image from 'next/image';
import { EastOutlined } from '@mui/icons-material';

export const HomeAbout = () => {
    return (
        <div className={styles.homeAboutUs__content} id='aboutUs'>
            <div className={styles.homeAboutUs__content__main}>
                <div className={styles.homeAboutUs__content__main__header}>
                    <SectionTitle
                        title='Propósitos'
                        subtitle='Sub-Headline'
                        align='center'
                    />
                    <p>{aboutUs.description}</p>
                    <Button
                        label='Saiba Mais'
                        variant='contained'
                        darkMode={false}
                    />
                </div>
                <div className={styles.homeAboutUs__content__main__image}>
                    {aboutUs.images.map((img, idx) => (
                        <div className={styles.homeAboutUs__content__main__image__item} key={idx}>
                            <Image
                                src={img.src}
                                fill
                                style={{ objectFit: 'cover' }}
                                alt='Image'
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.homeAboutUs__content__main__footer}>
                    <div className={styles.homeAboutUs__content__main__footer__title}>
                        <SectionTitle
                            title='Comemore Conosco'
                            subtitle='Nossa Missão e Visão'
                            align='center'
                        />
                    </div>
                    <p>{aboutUs.description}</p>
                    <Button
                        label='Leia Mais'
                        variant='text'
                        icon={<EastOutlined />}
                        iconPosition='right'
                        darkMode={false}
                    />
                </div>
            </div>
        </div>
    )
}