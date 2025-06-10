'use client';

import React from 'react';
import styles from './styles.module.scss';
import { HeaderContent } from '@/components/structure/HeaderContent';
import { NavBar } from '@/components/structure/NavBar';
import { MainContent } from '@/components/structure/MainContent';
import { HomeObjectives } from './_ui/HomeObjectives';
import { HomeAbout } from './_ui/HomeAbout';
import { HomeSchedule } from './_ui/HomeSchedule';
import { BannerSlider } from '@/components/comp/BannerSlider';
import { HomeEvents } from './_ui/HomeEvents';
import { HomeLocation } from './_ui/HomeLocation';
import { FooterContent } from '@/components/structure/FooterContent';

export default function HomePage() {
    return (
        <div className={styles.home_page}>
            <HeaderContent style={{ height: '100vh', width: '100vw' }}>
                <BannerSlider style={{ height: '100vh', width: '100vw' }}>
                    <NavBar />
                </BannerSlider>
            </HeaderContent>
            <MainContent>
                <HomeObjectives />
                <HomeAbout />
                <HomeSchedule />
                <HomeEvents />
                <HomeLocation />
            </MainContent>
            <FooterContent />
        </div>
    )
}