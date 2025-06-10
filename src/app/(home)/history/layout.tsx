'use client'

import React from 'react'
import styles from './styles.module.scss'

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.events_layout}>
            {children}
        </div>
    );
}