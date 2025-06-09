'use client'

import React from 'react'
import styles from './BannerSliderControls.module.scss'

type BannerSliderControlsProps = {
  total: number
  currentBanner: number
  onSelect: (index: number) => void
}

export const BannerSliderControls = ({ total = 1, currentBanner, onSelect }: BannerSliderControlsProps) => {
  return (
    <div className={styles.bannerSlider__controls}>
      <div className={styles.bannerSlider__controls__dots}>
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={index === currentBanner ? styles.active : ''}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  )
}
