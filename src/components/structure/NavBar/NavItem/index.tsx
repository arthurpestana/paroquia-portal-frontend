'use client';

import React, { useRef, useState } from 'react';
import styles from './NavItem.module.scss';
import Link from 'next/link';
import { ExpandMoreOutlined } from '@mui/icons-material';

type NavItemProps = {
    href?: string;
    label: string;
    onClick?: () => void;
    dropdown?: { href: string; label: string }[];
};

export const NavItem = ({ href, label, onClick, dropdown }: NavItemProps) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
        setOpenDropdown(true);
    };

    const handleMouseLeave = () => {
        leaveTimeout.current = setTimeout(() => {
            setOpenDropdown(false);
        }, 300);
    };

    return (
        <div
            className={`${styles.navItem__content} ${dropdown ? styles.navItem__content__dropdown : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setOpenDropdown(!openDropdown)}
            tabIndex={0}
            role="button"
            aria-haspopup={!!dropdown}
            aria-expanded={openDropdown}
        >
            {href ? (
                <Link href={href} onClick={onClick} className={styles.navItem__content__link}>
                    <span>{label}</span>
                </Link>
            ) : (
                <div className={styles.navItem__content__link}>
                    <span>{label}</span>
                    <span><ExpandMoreOutlined /></span>
                </div>
            )}
            {dropdown && (
                <div className={`${styles.navItem__content__dropdown__menu} ${openDropdown ? styles.fadeIn : styles.fadeOut}`}>
                    {dropdown.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClick}
                            className={styles.navItem__content__dropdown__menu__item}
                            target={item.href.startsWith('http') ? '__blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
