import { HeaderContent } from '@/components/structure/HeaderContent';
import styles from './styles.module.scss';
import { NavBar } from '@/components/structure/NavBar';
import { FooterContent } from '@/components/structure/FooterContent';
import { MainContent } from '@/components/structure/MainContent';

export default function EventsPage() {
    return (
        <div className={styles.events__page}>
            <HeaderContent style={{ width: '100vw' }}>
                <NavBar />
            </HeaderContent>
            <MainContent>
                <div></div>
            </MainContent>
            <FooterContent/>
        </div>
    );
}