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
import { NavBurguer } from '../NavBurguer';

export const NavBar = () => {
  const router = useRouter();
  const [isOpenNav, setIsOpenNav] = useState(false);

  return (
    <nav className={styles.navBar__content}>
      <div className={styles.navBar__content__logo} onClick={() => router.push('/home')}>
        <Image
          src="/images/paroquia-logo-horizontal-white.png"
          alt="Logo"
          width={200}
          height={70}
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
                  window.open(item.href, "__blank", "noreferrer noopener");
                }}
                variant="contained"
                darkMode={false}
              />
            );
          }
          return (
            <NavItem
              key={item.label}
              href={item.href}
              label={item.label}
              dropdown={item.dropdown}
              onClick={() => setIsOpenNav(false)}
            />
          );
        })}
      </div>

      <NavBurguer setIsOpenNav={setIsOpenNav} isOpenNav={isOpenNav}/>
    </nav>
  );
};
