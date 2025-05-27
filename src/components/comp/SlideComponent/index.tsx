'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import {Swiper, SwiperSlide} from 'swiper/react';
import style from './page.module.scss'
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

type DefaultSlide = {
  image: string;
  nome: string;
  description: string;
};

type SlideComponentProps<T> = {
  items: T[];
};

export const SlideComponent = <T extends DefaultSlide>({ items }: SlideComponentProps<T>) => {
    return(
        <Swiper 
        modules={[Autoplay, Pagination]}
        className={style.event_speaker_content_container} 
        spaceBetween={30} 
        slidesPerView={1}
        autoplay={{ delay: 6000 }}
        pagination={{ clickable: true }} 
        loop>
            {items.map((res, index) => (
                <SwiperSlide className={style.event_speaker_content_container_info} key={index}>
                    <div className={style.event_speaker_content_container_info_user}>
                        <Image 
                            src={res.image}
                            alt='Palestrante'
                            width={450}
                            height={350}
                            objectFit='cover'
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            priority
                        />
                    </div>

                    <div className={style.event_speaker_content_container_info_speaker}>
                        <h2>{res.nome}</h2>
                        <p>{res.description}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}