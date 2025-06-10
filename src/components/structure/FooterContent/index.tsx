'use client'

import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import styles from './FooterContent.module.scss';
import Link from 'next/link';
import { AlternateEmailOutlined, Facebook, Instagram } from '@mui/icons-material';
import { Form } from '@/components/comp/Form';
import { TextInput } from '@/components/comp/TextInput';
import { Button } from '@/components/comp/Button';
import { LabelIcon } from '@/components/comp/LabelIcon';
import navigationBarItems from "../../../lib/data/navbarItems.json"

export const FooterContent = () => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <footer className={styles.footer__content}>
            <div className={styles.footer__content__contactInfo}>
                <div className={styles.footer__content__contactInfo__logo}>
                    <Image
                        src="/images/paroquia-logo-horizontal-white.png"
                        alt="Logo Paróquia Nossa Senhora do Carmo"
                        width={200}
                        height={60}
                        className={styles.logo}
                    />
                </div>
                <div className={styles.footer__content__contactInfo__details}>
                    <p className={styles.copyright}>© COPYRIGHT FINSWEET 2025</p>
                    <p>(63) 3218-8308</p>
                    <p>Q. 108 NORTE ALAMEDA 2, 60 - PLANO DIRETOR NORTE, PALMAS - TO, 77006-096</p>
                    <p>EMAIL@EXAMPLE.COM</p>
                </div>
            </div>
            <div className={styles.footer__content__navigation}>
                <div className={styles.footer__content__navigation__navLinks}>
                    <h3>Navegação</h3>
                    <ul>
                        {navigationBarItems.map(item => {
                            if (item.isButton || item.dropdown) {
                                return null;
                            }
                            return (
                                <li key={item.label}>
                                    <Link href={item.href} onClick={() => window.scrollTo(0, 0)}>
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className={styles.footer__content__navigation__navLinks}>
                    <h3>Redes Sociais</h3>
                    <div className={styles.footer__content__navigation__navLinks__socials}>
                        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <Facebook/>
                        </Link>
                        <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.footer__content__newsLetter}>
                <h2>INSCREVA-SE PARA RECEBER NOVIDADES SOBRE A PARÓQUIA</h2>
                <Form onSubmit={handleNewsletterSubmit} className={styles.footer__content__newsLetter__form}>
                    <TextInput
                        name="email"
                        label={
                            <LabelIcon 
                                label="Digite seu email"
                                icon={<AlternateEmailOutlined />}
                                iconPosition="left"
                            />
                        }
                        type="email"
                        placeholder="seumail@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant='floating'
                    />
                    <div className={styles.footer__content__newsLetter__form__button}>
                        <Button
                            type="submit"
                            label="Enviar"
                            variant="contained"
                            darkMode={false}
                        />
                    </div>
                </Form>
            </div>
        </footer>
    );
};