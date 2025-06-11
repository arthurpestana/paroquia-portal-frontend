import React, { ReactNode } from 'react'
import { Popup } from '../index'
import styles from './PopupForm.module.scss'
import { ClearOutlined } from '@mui/icons-material'
import { Button } from '@/components/comp/Button'


type PopupFormProps = {
    headerData: {
        title: string
        description?: string
        message?: string
    }
    fields: ReactNode[]
    isOpen: boolean
    setOpen: (value: boolean) => void
    onSubmit?: () => void
    hasCancel?: () => void
    buttonData?: {
        confirm?: string
        cancel?: string
    }
    closeBtn?: boolean
}

export const PopupForm = ({ headerData, fields, isOpen, setOpen, onSubmit, hasCancel, buttonData = { confirm: "Confirmar", cancel: "Cancelar" }, closeBtn }: PopupFormProps) => {

    const handleSubmit = () => {
        if (onSubmit) onSubmit()
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
        if (hasCancel) hasCancel()
    }
    return (
        <Popup isOpen={isOpen}>
            <div className={styles.popup__section}>
                {(!onSubmit || closeBtn) && <div className={styles.popup__section__close}>
                    <Button icon={<ClearOutlined />} onClick={() => setOpen(false)} variant='text' />
                </div>}
                <div className={`${styles.popup__section__header} ${closeBtn ? styles.close : ""}`}>
                    <h1>{headerData?.title}</h1>
                    <p>{headerData?.description}</p>
                </div>
                {fields && fields?.length >= 1 && <div className={styles.popup__section__content}>
                    {fields?.map((item, index) => (
                        <div key={index} className={styles.popup__section__content__field}>
                            {item}
                        </div>
                    ))}
                </div>}
                {onSubmit && <div className={`${styles.popup__section__footer}`}>
                    <Button label={buttonData.cancel} onClick={() => hasCancel ? handleCancel() : setOpen(false)} />
                    <Button label={buttonData?.confirm} onClick={() => handleSubmit()} />
                </div>}
            </div>
        </Popup>
    )
}
