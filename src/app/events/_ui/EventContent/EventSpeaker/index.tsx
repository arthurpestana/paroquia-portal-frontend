import style from './page.module.scss';
import { SlideComponent } from '@/components/comp/SlideComponent';
import { EventType } from '@/lib/types/EventType';

export const EventSpeaker = ({ event }: EventType) => {
    return(
        <div className={style.event_speaker_content}>
            <h1>Organizadores</h1>
            <SlideComponent items={event?.responsibles}/>
        </div>
    );
}