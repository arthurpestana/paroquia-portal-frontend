import React from 'react'
import styles from './NoContent.module.scss'

type NoContentProps = {
    text: string;
    mini?: boolean;
}

export const NoContent = ({text, mini}: NoContentProps) => {
    return (
        <div className={`${styles.noContent__section} ${mini&&styles.mini}`}>
            <p>{text}</p>
        </div>
    )
}