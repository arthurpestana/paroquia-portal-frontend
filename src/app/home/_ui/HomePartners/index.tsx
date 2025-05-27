import React from 'react';
import styles from './HomePartners.module.scss';
import PartnersInfo from "@/lib/data/home/partnersInfo.json";
import { InfiniteScroller } from '@/components/comp/InfiniteScroller';

export const HomePartners = () => {
    const partners = PartnersInfo.map((partner) => (partner.image));

    return (
        <div className={styles.partners__content}>
            <InfiniteScroller
                items={partners}
                scrollDirection='right'
            />
        </div>
    )
}