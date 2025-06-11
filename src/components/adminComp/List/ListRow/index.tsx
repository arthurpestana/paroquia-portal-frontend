import React, { ReactNode } from 'react'
import styles from '../List.module.scss'

export const ListRow = ({children}: {children: ReactNode}) => {
    return (
        <div className={styles.list__row}>
            {children}
        </div>
    )
}