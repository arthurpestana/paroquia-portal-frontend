import React from 'react'
import styles from './PopupAlert.module.scss'
import { Popup } from '../index'
import { Button } from '@/components/comp/Button';

type PopupAlertProps = {
    title: string;
    description: string;
    message: string;
    isOpen: boolean;
    setOpen: (open: boolean | string) => void;
    buttonLabel: string;
    onSubmit: () => void;
}

export const PopupAlert = ({ title, description, message, isOpen, setOpen, buttonLabel, onSubmit }: PopupAlertProps) => {
    
    const handleSubmit = () => {
        onSubmit()
        setOpen(false)
    }

    return (
        <Popup isOpen={isOpen}>
            <div className={styles.popup__section__header}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div className={styles.popup__section__content}>
                <p>{message}</p>
            </div>
            <div className={`${styles.popup__section__footer}`}>
                <Button label="Cancelar" onClick={() => setOpen(false)} />
                <Button label={buttonLabel} onClick={() => handleSubmit()} />
            </div>
        </Popup>
    )
}
