'use client';

import React from 'react';
import styles from './page.module.scss';
import { HomeAbout } from './_ui/HomeAbout';
import { HomeBanner } from './_ui/HomeBanner';
import { HomeObjectives } from './_ui/HomeObjectives';
import { HeaderContent } from '@/components/structure/HeaderContent';
import { NavBar } from '@/components/structure/NavBar';
import { MainContent } from '@/components/structure/MainContent';

import { FooterContent } from '@/components/structure/FooterContent';
import { HomeTimeline } from './_ui/HomeTimeline';
import { HomeLocation } from './_ui/HomeLocation';
import { HomePartners } from './_ui/HomePartners';

export default function HomePage() {
    return (
        <div className={styles.home__page}>
            <HeaderContent height='100vh' style={{ backgroundImage: 'url(/images/banner.png)'}}>
                <NavBar/>
                <HomeBanner/>
            </HeaderContent>
            <MainContent>
                <HomePartners/>
                <HomeAbout />
                <HomeObjectives />
                <HomeTimeline />
                <HomeLocation/>
            </MainContent>
            <FooterContent/>
        </div>
    )
}