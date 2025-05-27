import React, { useEffect, useState } from 'react';
import styles from './InfiniteScroller.module.scss';
import Image from 'next/image';

type InfiniteScrollerProps = {
    items: string[];
    scrollDirection?: 'right' | 'left';
}

export const InfiniteScroller = ({ items, scrollDirection }: InfiniteScrollerProps) => {
    const [slides, setSlides] = useState<string[]>([]);

    useEffect(() => {
        setSlides([...items, ...items, ...items, ...items, ...items]);
    }, [items])

    return (
        <div className={styles.infiniteScroller__content}>
            <div className={`${styles.infiniteScroller__content__tracker} ${scrollDirection === 'right' ? styles.scrollRight : styles.scrollLeft}`}>
                {slides.map((item, index) => (
                    <div key={index} className={styles.infiniteScroller__content__tracker__item}>
                        <Image
                            src={item}
                            alt={`Slide ${index}`}
                            width={100}
                            height={80}
                            className={styles.infiniteScroller__content__tracker__item__image}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}