import React, { useState, useEffect } from 'react'
import { Button } from '../../Button'
import { Popup } from '../index'
import styles from './PopupForm.module.scss'
import { ClearOutlined } from '@mui/icons-material'

interface dataProps {
    title: string
    description?: string
    message?: string
}

export const PopupForm = ({ data, fields, isOpen, setOpen, onSubmit, hasCancel, buttonData = { confirm: "Confirmar", cancel: "Cancelar"}, closeBtn }: { data: dataProps, fields: any[], isOpen: boolean, setOpen: any, onSubmit?: any, hasCancel?: any, buttonData?: { confirm?: string, cancel?: string}, closeBtn?: boolean}) => {

    const handleSubmit = () => {
        onSubmit()
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
        hasCancel()
    }

    return (
        <Popup isOpen={isOpen}>
            <div className={styles.popup__section}>
                {(!onSubmit || closeBtn)&& <div className={styles.popup__section__close}>
                    <Button tooltip={{ label: "Fechar", position: "left" }} icon={<ClearOutlined />} onClick={() => setOpen(false)} active={true} simpleButton />
                </div>}
                <div className={`${styles.popup__section__header} ${closeBtn ? styles.close : ""}`}>
                    <h1>{data?.title}</h1>
                    <p>{data?.description}</p>
                </div>
                {fields && fields?.length >= 1 && <div className={styles.popup__section__content}>
                    {fields?.map((item: any) => (
                        <div key={item?.id} className={styles.popup__section__content__field}>
                            {item}
                        </div>
                    ))}
                </div>}
                {onSubmit && <div className={`${styles.popup__section__footer}`}>
                    <Button text={buttonData.cancel} onClick={() => hasCancel ? handleCancel() : setOpen(false)} active={true} />
                    <Button text={buttonData?.confirm} onClick={() => handleSubmit()} active={true} />
                </div>}
            </div>
        </Popup>
    )
}
