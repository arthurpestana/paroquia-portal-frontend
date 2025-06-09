import React, { useRef, useState, useEffect } from 'react'
import styles from './SliderCards.module.scss'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'

interface CardData {
  id: number
  content: React.ReactNode
}

interface SliderCardsProps {
  cards: CardData[]
}

export const SliderCards: React.FC<SliderCardsProps> = ({ cards }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [clones, setClones] = useState<CardData[]>([])

  useEffect(() => {
    setClones([...cards, ...cards, ...cards])
  }, [cards])

  const scrollByAmount = 280 // largura do card + gap (ajustar no CSS)

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollWidth = el.scrollWidth
      const scrollLeft = el.scrollLeft

      const third = scrollWidth / 3

      if (scrollLeft < third / 2) {
        el.scrollLeft = scrollLeft + third
      } else if (scrollLeft > third * 1.5) {
        el.scrollLeft = scrollLeft - third
      }
    }

    el.addEventListener('scroll', handleScroll)
    el.scrollLeft = el.scrollWidth / 3

    return () => {
      el.removeEventListener('scroll', handleScroll)
    }
  }, [clones])

  // Drag to scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollLeftStart = 0

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      el.classList.add(styles.active)
      startX = e.pageX - el.offsetLeft
      scrollLeftStart = el.scrollLeft
    }

    const onMouseLeave = () => {
      isDown = false
      el.classList.remove(styles.active)
    }

    const onMouseUp = () => {
      isDown = false
      el.classList.remove(styles.active)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1.5 // scroll-fast multiplier
      el.scrollLeft = scrollLeftStart - walk
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
    }
  }, [clones])

  return (
    <div className={styles.sliderWrapper}>
      <button className={styles.arrow} onClick={scrollLeft} aria-label="Scroll Left">
        <ChevronLeftOutlined />
      </button>
      <div ref={scrollRef} className={styles.slider}>
        {clones.map((card, idx) => (
          <div key={`${card.id}-${idx}`} className={styles.card}>
            {card.content}
          </div>
        ))}
      </div>
      <button className={styles.arrow} onClick={scrollRight} aria-label="Scroll Right">
        <ChevronRightOutlined />
      </button>
    </div>
  )
}
