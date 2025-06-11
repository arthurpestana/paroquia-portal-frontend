'use client'

import React, { useEffect } from 'react'
import styles from './Popup.module.scss'

interface PopupProps {
    children: React.ReactNode
    isOpen: boolean
}

export const Popup = ({ children, isOpen }: PopupProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <div className={`${styles.popup__section} ${!isOpen ? styles.closed : ''}`}>
            <div className={styles.popup__section__box}>{children}</div>
        </div>
    )
}
