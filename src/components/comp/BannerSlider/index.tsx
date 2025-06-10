'use client'

import React, { useEffect, useState } from 'react'
import styles from './BannerSlider.module.scss'
import { Button } from '@/components/comp/Button'
import { BannerSliderControls } from './BannerSliderControls'
import { useActiveBanners } from '@/hooks/useActiveBanners'
import { useRouter } from 'next/navigation'

type BannerSliderProps = {
    style?: React.CSSProperties
    children?: React.ReactNode
}

export const BannerSlider = ({ style, children }: BannerSliderProps) => {
    const router = useRouter()
    const { banners, loading, error } = useActiveBanners()
    const [currentBanner, setCurrentBanner] = useState(0)
    console.log('banners', banners, loading, error)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner(prev => (prev + 1) % banners.length)
        }, 7000)

        return () => clearInterval(interval)
    }, [banners])

    const banner = banners[currentBanner]

    const selectBanner = (index: number) => setCurrentBanner(index)

    return (
        <div
            className={styles.bannerSlider__content}
            style={{
                ...style,
                backgroundImage: `url(${banner?.image?.url || '/images/paroquia-bg.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={styles.bannerSlider__content__children}>
                {children}
            </div>
            <div className={styles.bannerSlider__content__main}>
                <div className={styles.bannerSlider__content__main__info}>
                    <div className={styles.bannerSlider__content__main__info__text}>
                        <h3>BEM-VINDO À NOSSA IGREJA</h3>
                        <h1>{banner?.title || "PARÓQUIA NOSSA SENHORA DO CARMO"}</h1>
                        <p>{banner?.description || 'Lorem ipsum dolor sir amet, consectetur adipiscing elit, sed do.'}</p>
                    </div>
                    <div className={styles.bannerSlider__content__main__info__button}>
                        <Button
                            label={banner?.buttonInfo?.text || 'Saiba Mais'}
                            variant="contained"
                            darkMode={false}
                            onClick={() => {
                                if (banner?.buttonInfo?.link?.includes('http')) {
                                    window.open(banner.buttonInfo.link, '_blank', 'noreferrer noopener')
                                    return
                                }
                                router.push(banner.buttonInfo.link)
                            }}
                        />
                    </div>
                </div>
                <BannerSliderControls
                    total={banners?.length}
                    currentBanner={currentBanner}
                    onSelect={selectBanner}
                />
            </div>
        </div>
    )
}
