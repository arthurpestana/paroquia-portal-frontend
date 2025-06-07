'use client'

import React from 'react';
import styles from './FooterContent.module.scss'
import Image from 'next/image';
import navbarItems from "@/lib/data/navbarItems.json";
import { NavItemType } from '@/lib/types/NavItemType';
import { NavItem } from '../NavBar/NavItem';
import { Button } from '@/components/comp/Button';
import InstagramIcon from '@mui/icons-material/Instagram';

export const FooterContent = () => {
    return (
        <footer className={styles.footer_content}>
            <div className={styles.footer_content_logo}>
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className={styles.footer_content_logo_img}
                />
            </div>
            <div className={styles.footer_content_nav}>
                {navbarItems.map((item: NavItemType) => {
                    if (item.isButton) {
                        return null
                    }
                    return (
                        <NavItem
                            key={item.label}
                            href={item.href}
                            label={item.label}
                        />
                    );
                })}
            </div>
            <div className={styles.footer_content_socials}>
                <Button
                    icon={<InstagramIcon />}
                    onClick={() => window.open("https://www.instagram.com/tec_inclusao/", "_blank", "noreferrer noopener")}
                    variant='text'
                    darkMode={true}
                />
            </div>
        </footer>
    )
}