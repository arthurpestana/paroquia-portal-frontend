import React from 'react'
import styles from './styles.module.scss'

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.home_layout}>
            {children}
        </div>
    );
}