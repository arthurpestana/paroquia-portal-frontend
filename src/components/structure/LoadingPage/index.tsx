import React from 'react'
import styles from './LoadingPage.module.scss'
import { DefaultImages } from '../../assets/images'

export const LoadingPage = () => {
    const logo = DefaultImages['logo-icone-branca']

    return (
        <div className={styles.loadingPage}>
            <div className={styles.loadingPage__content}>
                <div className={styles.loadingPage__content__orbital}>
                    <img src={logo.imagem} alt="Logo" className={styles.loadingPage__content__orbital__logo} />
                    <div className={styles.loadingPage__content__orbital__spinner}></div>
                </div>
                <span className={styles.loadingPage__content__text}>Carregando</span>
            </div>
        </div>
    )
}
