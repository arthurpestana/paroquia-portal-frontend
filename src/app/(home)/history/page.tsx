import { HeaderContent } from '@/components/structure/HeaderContent';
import styles from './styles.module.scss';
import { NavBar } from '@/components/structure/NavBar';
import { FooterContent } from '@/components/structure/FooterContent';
import { MainContent } from '@/components/structure/MainContent';

export default function HistoryPage() {
    return (
        <div className={styles.history__page}>
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