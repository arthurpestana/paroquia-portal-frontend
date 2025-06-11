/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import styles from './NavItemSide.module.scss'
import { useRouter } from 'next/navigation';
import * as Icons from '@mui/icons-material'

type NavItemSideProps = {
    href?: string;
    label: string;
    onClick?: () => void;
    icon?: string | React.ReactNode;
};

export const NavItemsSide = ({ href, label, onClick, icon }: NavItemSideProps) => {
    const IconComponent = icon && typeof icon === "string" && (Icons as any)[icon];
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            router.push(href);
        }
        if (onClick) {
            onClick();
        }
    }

    return (
        <div
            className={`${styles.navItem__content}`}
            onClick={handleClick}
        >
            {IconComponent && (
                <span className={styles.navItem__content__icon} ><IconComponent /></span>
            )}
            {!IconComponent && icon && (
                <span className={styles.navItem__content__icon}>{icon}</span>
            )}
            <span className={styles.navItem__content__text}>{label}</span>
        </div>
    )
}