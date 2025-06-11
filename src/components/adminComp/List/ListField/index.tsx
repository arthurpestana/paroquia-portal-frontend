import React from 'react'
import styles from '../List.module.scss'

type ListFieldProps = {
    children: React.ReactNode
    display: string
    gap?: string
    flexWrap?: boolean
}

export const ListField = ({children, display, gap, flexWrap}: ListFieldProps) => {
    return (
        <div className={`${styles.list__field} ${display === 'flex' && flexWrap ? styles.flexWrap : display === 'flex' ? styles.flex : styles.block}`} style={gap ? { gap: `${gap}` } : {}}>
            {children}
        </div>
    )
}