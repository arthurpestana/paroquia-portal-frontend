import { EventType } from '@/lib/types/EventType';
import style from './page.module.scss'
import { MapFrame } from '@/components/comp/MapFrame';

export const EventDescription = ({ event }: EventType) => {
    return(
        <div className={style.event_description_content}>
            <div className={style.event_description_content_info}>
                <div className={style.event_description_content_info_header}>
                    <h1>{event.title}</h1>
                    <p>Palestrado por: {event.speaker}</p>
                </div>
                
                <div className={style.event_description_content_info_main}>
                    <h4>Descrição</h4>
                    <p>{event.description}</p>
                </div>      
            </div>
            <MapFrame
                width="600" 
                height="250"
            />
        </div>
    );
}