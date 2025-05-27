import React from 'react';
import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loader__content}>
      <div className={styles.loader__content__spinner}></div>
    </div>
  );
};