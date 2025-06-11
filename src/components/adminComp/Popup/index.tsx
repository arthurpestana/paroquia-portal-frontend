import React, { useState, useRef, useEffect} from 'react'
import { Button } from '../Button'
import { TextInput } from '../TextInput'
import styles from './Popup.module.scss'

interface PopupProps {
    children: React.ReactNode
    isOpen: boolean
}

export const Popup: React.FC<PopupProps> = ({ children, isOpen }) => {
    useEffect(() => {
        isOpen ? window.document.body.style.overflow = 'hidden' : window.document.body.style.overflow = ''
    }, [isOpen]);

    return (
        <div className={`${styles.popup__section} ${!isOpen ? styles.closed : ''}`}>
            <div className={styles.popup__section__box}>{children}</div>
        </div>
    )
}
