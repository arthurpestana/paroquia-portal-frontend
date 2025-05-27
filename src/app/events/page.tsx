import { HeaderContent } from '@/components/structure/HeaderContent';
import styles from './page.module.scss';
import { NavBar } from '@/components/structure/NavBar';
import { EventContent } from './_ui/EventContent';
import { FooterContent } from '@/components/structure/FooterContent';
import { MainContent } from '@/components/structure/MainContent';
import { Suspense } from 'react';
import { Loading } from '@/components/comp/Loading';

export default function EventsPage() {
    return (
        <div className={styles.events__page}>
            <HeaderContent height='50vh' style={{ backgroundImage: 'url(/images/banner2.png)', backgroundPosition: 'top center' }}>
                <NavBar />
            </HeaderContent>
            <MainContent>
                <Suspense fallback={<Loading />}>
                    <EventContent />
                </Suspense>
            </MainContent>
            <FooterContent />
        </div>
    );
}