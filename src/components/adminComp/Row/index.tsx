import React, { ReactNode } from 'react'
import styles from './Row.module.scss'

export const Row = ({children}: {children: ReactNode}) => {
    return (
        <div className={styles.row__content}>
            {children}
        </div>
    )
}