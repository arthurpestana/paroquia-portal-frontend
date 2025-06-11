import React from 'react';
import styles from '../List.module.scss';

type ListTextProps = {
    text?: string | React.ReactNode;
    icon?: React.ReactNode;
    maxLength?: number;
}

export const ListText = ({ text, icon, maxLength = 40 }: ListTextProps) => {
    const truncatedText = text && typeof text === "string" && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

    return (
        <div className={styles.list__text}>
            {icon && <span>{icon}</span>}
            {truncatedText && <span>{truncatedText}</span>}
        </div>
    );
};
