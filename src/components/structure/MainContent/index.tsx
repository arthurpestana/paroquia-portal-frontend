import React from 'react';
import styles from './MainContent.module.scss'

export const MainContent = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <main className={styles.main__content}>
            {children}
        </main>
    )
}