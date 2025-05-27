
'use client';

import { Button } from '@/components/comp/Button';
import style from './page.module.scss'
import { EventType } from '@/lib/types/EventType';

export const EventSubDescription = ({ event }: EventType) => {

    return(
        <div className={style.event_sub_description}>
            <div className={style.event_sub_description_info}>
                    <div className={style.event_sub_description_info_item}>
                        <h3>Data</h3>
                        <p>{`${event.date.day}/${event.date.month}/${event.date.year}`}</p>
                    </div>
                    <div className={style.event_sub_description_info_item}>
                        <h3>Horário</h3>
                        <p>{event.time}</p>
                    </div>
                    <div className={style.event_sub_description_info_item}>
                        <h3>Tipo do evento</h3>
                        <p>{event.type}</p>
                    </div>
                    <div className={style.event_sub_description_info_item}>
                        <h3>Localização</h3>
                        <p>{event.location}</p>
                    </div>
            </div>

            <Button
                label="Inscreva-se"
                onClick={() => window.open("https://www.unitins.br/Eventos/Inscricao/2244", "_blank")}
                variant="outlined"
                darkMode={false}
                />
        </div>
    );
}