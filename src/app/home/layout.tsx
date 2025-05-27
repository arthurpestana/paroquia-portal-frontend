'use client'

import React from 'react'
import styles from './page.module.scss'

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.home__layout}>
            {children}
        </div>
    );
}