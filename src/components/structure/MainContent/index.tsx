import React from 'react';
import styles from './MainContent.module.scss'

type MainContentProps = {
    style?: React.CSSProperties;
    children: React.ReactNode;
}

export const MainContent = ({ children, style }: MainContentProps) => {
    return (
        <main className={styles.main__content} style={{ ...style }}>
            {children}
        </main>
    )
}