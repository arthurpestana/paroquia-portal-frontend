'use client'

import React, { useState } from 'react'
import styles from './NavBarSide.module.scss'
import { NavItemsSide } from './NavItemSide'
import Link from 'next/link'
import navbarItemsSide from '../../../lib/data/admin/navbarSideItems.json'
import { NavBurguer } from '@/components/structure/NavBurguer'
import Image from 'next/image'
import Cookies from 'js-cookie';
import { LogoutOutlined } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export const NavBarSide = () => {
    const [isOpenNav, setIsOpenNav] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('auth_token');
        Cookies.remove('user');
        router.push('/auth');
    };

    return (
        <nav className={`${styles.navBar__content}`}>
            <div className={styles.navBar__content__burguer}>
                <NavBurguer setIsOpenNav={setIsOpenNav} isOpenNav={isOpenNav} />
            </div>
            <div className={`${styles.navBar__content__nav} ${isOpenNav && styles.active}`}>
                <div className={styles.navBar__content__nav__header}>
                    <Link href="/home" className={styles.navBar__content__nav__header__logo}>
                        <Image
                            src="/images/paroquia-logo-horizontal.png"
                            alt="Logo"
                            fill
                            priority
                        />
                    </Link>
                </div>
                <div className={styles.navBar__content__nav__items}>
                    {navbarItemsSide.map((item, index) => {
                        const isActive = item.href === window.location.pathname;

                        return (
                            <NavItemsSide
                                key={index}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                active={isActive}
                            />
                        )
                    })}
                </div>
                <div className={styles.navBar__content__nav__footer}>
                    <NavItemsSide
                        key={'logout'}
                        label={"Sair"}
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </nav>
    )
}
