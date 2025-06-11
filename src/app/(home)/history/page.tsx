import { HeaderContent } from '@/components/structure/HeaderContent';
import styles from './styles.module.scss';
import { NavBar } from '@/components/structure/NavBar';
import { FooterContent } from '@/components/structure/FooterContent';
import { MainContent } from '@/components/structure/MainContent';
import { HomeAbout } from '../home/_ui/HomeAbout';
import { HomeObjectives } from '../home/_ui/HomeObjectives';
import aboutUs from '@/lib/data/history/HistoryAbout.json'
import { SlideComponent } from '@/components/comp/SlideComponent';

export default function HistoryPage() {
    return (
        <div className={styles.history__page}>
            <HeaderContent style={{ width: '100vw' }}>
                <NavBar />
            </HeaderContent>
            <MainContent>
                <HomeAbout subtitle='Quem nós somos' title='Conheça nossa história' description={aboutUs.aboutUs}/>
                <HomeObjectives title='Pastorais'/>
                <SlideComponent/>
            </MainContent>
            <FooterContent/>
        </div>
    );
}