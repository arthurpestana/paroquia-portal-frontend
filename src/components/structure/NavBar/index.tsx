// NavBar.tsx
'use client';

import React, { useState } from 'react';
import Image from "next/image";
import styles from "./NavBar.module.scss";
import { NavItem } from "./NavItem";
import { NavItemType } from "@/lib/types/NavItemType";
import navbarItems from "@/lib/data/navbarItems.json";
import { Button } from "@/components/comp/Button";
import { useRouter } from 'next/navigation';

export const NavBar = () => {
  const router = useRouter();
  const [isOpenNav, setIsOpenNav] = useState(false);

  return (
    <nav className={styles.navBar__content}>
      <div className={styles.navBar__content__logo} onClick={() => router.push('/home')}>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={80}
          height={80}
          priority
        />
      </div>

      <div
        className={`${styles.navBar__content__items} ${isOpenNav && styles.active}`}
      >
        {navbarItems.map((item: NavItemType) => {
          if (item.isButton) {
            return (
              <Button
                key={item.href}
                label={item.label}
                onClick={() => {
                  setIsOpenNav(false);
                  window.open(item.href, "_blank", "noreferrer noopener");
                }}
                variant="outlined"
                darkMode={true}
              />
            );
          }
          return (
            <NavItem
              key={item.label}
              href={item.href}
              label={item.label}
              onClick={() => setIsOpenNav(false)}
            />
          );
        })}
      </div>

      <div className={`${styles.navBar__content__burger} ${isOpenNav && styles.active}`} onClick={() => setIsOpenNav(!isOpenNav)} >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};
