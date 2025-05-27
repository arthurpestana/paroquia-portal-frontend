'use client';

import React from 'react';
import styles from './NavItem.module.scss';
import Link from 'next/link';

type NavItemProps = {
    href: string;
    label: string;
    onClick?: () => void;
}

export const NavItem = ({ href, label, onClick }: NavItemProps) => {
    return (
        <div className={styles.navItem__content}>
            <Link href={href} onClick={onClick} className={styles.navItem__content__link}>
                <span>{label}</span>
            </Link>
        </div>
    )
}