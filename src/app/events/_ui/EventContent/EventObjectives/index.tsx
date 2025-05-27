import { EventType } from '@/lib/types/EventType';
import style from './page.module.scss'
import { CircleAlert } from 'lucide-react';

export const EventObjectives = ({ event }: EventType) => {
    return(
        <div className={style.event_objectives_content}>
            <div className={style.event_objectives_content_info}>
                
                <h2>Objetivos Específicos</h2>

                {event.objectives.map((obj: string, index: number) => (
                    <div className={style.event_objectives_content_info_main} key={index}>
                        <p>{obj}</p>
                    </div>
                ))}
                
            </div>

            <CircleAlert className={style.icon_hide_mobile} size={150}/>
        </div>
    );
}