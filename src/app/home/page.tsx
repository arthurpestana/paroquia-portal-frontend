'use client';

import React from 'react';
import styles from './page.module.scss';
import { HeaderContent } from '@/components/structure/HeaderContent';
import { NavBar } from '@/components/structure/NavBar';
import { MainContent } from '@/components/structure/MainContent';
import { HomeBanner } from './_ui/HomeBanner';
import { HomeObjectives } from './_ui/HomeObjectives';
import { HomeAbout } from './_ui/HomeAbout';

export default function HomePage() {
    return (
        <div className={styles.home__page}>
            <HeaderContent height='100vh' style={{ backgroundImage: 'url(/images/paroquia.jpg)'}}>
                <NavBar/>
                <HomeBanner/>
            </HeaderContent>
            <MainContent>
                <HomeObjectives/>
                <HomeAbout/>
            </MainContent>
        </div>
    )
}