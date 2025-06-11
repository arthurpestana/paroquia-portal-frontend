import React from 'react'
import styles from '../List.module.scss'

export const ListField = ({children, display, gap, flexWrap}: { children: any; display: string, gap?: string, flexWrap?: boolean}) => {
    return (
        <div className={`${styles.list__field} ${display === 'flex' && flexWrap ? styles.flexWrap : display === 'flex' ? styles.flex : styles.block}`} style={gap ? { gap: `${gap}` } : {}}>
            {children}
        </div>
    )
}