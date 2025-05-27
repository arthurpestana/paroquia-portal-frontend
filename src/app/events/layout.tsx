'use client'

import React from 'react'
import styles from './page.module.scss'

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.events__layout}>
            {children}
        </div>
    );
}