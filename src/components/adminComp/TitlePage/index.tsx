import React from 'react';
import styles from './TitlePage.module.scss';

type TitlePageProps = {
    title: string;
    description: string;
}

export const TitlePage = ({ title, description }: TitlePageProps) => {
    return (
        <div className={styles.titlePage__section}>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}