import React, { useRef, useEffect, useState, ReactNode } from 'react'
import styles from './SliderCards.module.scss'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import { Button } from '../Button'
import { useSliderScroll } from '@/hooks/useSliderScroll'

type SliderCardsProps = {
    children: ReactNode[]
}

export const getCardWidth = (element: HTMLDivElement): number => {
    const width = element.offsetWidth
    const style = window.getComputedStyle(element)
    const marginRight = parseFloat(style.marginRight) || 0
    return width + marginRight
}

export const SliderCards = ({ children }: SliderCardsProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const firstCardRef = useRef<HTMLDivElement>(null)
    const [cardWidth, setCardWidth] = useState(280)

    useEffect(() => {
        if (firstCardRef.current) {
            const width = getCardWidth(firstCardRef.current)
            setCardWidth(width)
        }
    }, [children])

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }

    useSliderScroll(scrollRef)

    return (
        <div className={styles.sliderCards__content}>
            <div className={styles.sliderCards__content__controls}>
                <Button
                    onClick={scrollLeft}
                    aria-label="Scroll Left"
                    icon={<ChevronLeftOutlined />}
                    variant="outlined"
                />
            </div>
            <div ref={scrollRef} className={styles.sliderCards__content__slider}>
                {children.map((card, idx) => (
                    <div
                        key={idx}
                        ref={idx === 0 ? firstCardRef : null}
                        className={styles.sliderCards__content__slider__card}
                    >
                        {card}
                    </div>
                ))}
            </div>
            <div className={styles.sliderCards__content__controls}>
                <Button
                    onClick={scrollRight}
                    aria-label="Scroll Right"
                    icon={<ChevronRightOutlined />}
                    variant="outlined"
                />
            </div>
        </div>
    )
}
