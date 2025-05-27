'use client'

import style from './page.module.scss'
import { EventSubDescription } from "./EventSubDescription";
import { EventDescription } from './EventDescription';
import { EventObjectives } from './EventObjectives';
import { EventSpeaker } from './EventSpeaker';
import { notFound, useSearchParams } from 'next/navigation';
import events from '@/lib/data/eventsTimeline.json';

export const EventContent = () => {
    const searchParams = useSearchParams();
    
    const eventData = {
        id: searchParams.get('id') || '',
    }

    const event = events.find((event) => event.id == Number(eventData.id));
    console.log(event);

    if (!event) {
        notFound();
    }

    return(
        <div className={style.event_content}>
            <EventSubDescription event={event}/>
            <EventDescription event={event}/>
            <EventObjectives event={event}/>
            <EventSpeaker event={event}/>
        </div>
    );
}