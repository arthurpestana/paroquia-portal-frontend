import React, { CSSProperties, ReactNode } from 'react';
import styles from './PageContent.module.scss';

type PageContentProps = {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}

export const PageContent = ({ children, style, className }: PageContentProps) => {
    return (
        <div className={`${styles.page__content} ${className}`} style={style}>
            {children}
        </div>
    );
}