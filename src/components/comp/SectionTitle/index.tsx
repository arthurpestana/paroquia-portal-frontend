import React from 'react';
import styles from './SectionTitle.module.scss'

type SectionTitleProps = {
    title: string;
    subtitle?: string;
    align?: 'flex-start' | 'center' | 'flex-end';
}

const TextAlingMap = new Map<SectionTitleProps['align'], 'left' | 'center' | 'right'>([
    ['flex-start', 'left'],
    ['center', 'center'],
    ['flex-end', 'right']
])

export const SectionTitle = ({ title, subtitle, align = 'center' }: SectionTitleProps) => {
    return (
        <div className={styles.sectionTitle__content} style={{ alignItems: align, textAlign: align ? TextAlingMap.get(align): "justify" }}>
            <h3>{subtitle}</h3>
            <h2>{title}</h2>
        </div>
    )
}