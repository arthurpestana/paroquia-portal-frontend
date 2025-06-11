import React from 'react'
import styles from '../List.module.scss'

export const ListRow = ({children}: {children: any}) => {
    return (
        <div className={styles.list__row}>
            {children}
        </div>
    )
}