import React from 'react'
import styles from './PopupAlert.module.scss'
import { Popup } from '../index'
import { Button } from '@/components/comp/Button';

type PopupAlertProps = {
    title: string;
    description: string;
    isOpen: boolean;
    setOpen: (open: boolean | string) => void;
    buttonLabel: {
        confirm: string;
        cancel: string;
    };
    onSubmit: () => void;
}

export const PopupAlert = ({
    title,
    description,
    isOpen,
    setOpen,
    buttonLabel = {
        confirm: 'Confirmar',
        cancel: 'Cancelar'
    },
    onSubmit }: PopupAlertProps) => {

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
            <div className={`${styles.popup__section__footer}`}>
                <Button label={buttonLabel.cancel} onClick={() => setOpen(false)} />
                <Button label={buttonLabel.confirm} onClick={() => handleSubmit()} />
            </div>
        </Popup>
    )
}
