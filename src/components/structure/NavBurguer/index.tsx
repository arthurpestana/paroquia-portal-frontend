import React from 'react';
import styles from './NavBurguer.module.scss';

type NavBurguerProps = {
    isOpenNav: boolean;
    setIsOpenNav: (isOpenNav: boolean) => void;
}

export const NavBurguer = ({ isOpenNav, setIsOpenNav }: NavBurguerProps) => {
    return (
        <div className={`${styles.navBurguer__content} ${isOpenNav && styles.active}`} onClick={() => setIsOpenNav(!isOpenNav)} >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}