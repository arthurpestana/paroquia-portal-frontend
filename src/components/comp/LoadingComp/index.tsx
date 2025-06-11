import { useEffect } from 'react'
import styles from './LoadingComp.module.scss'

export const LoadingComp = () => {
  useEffect(() => {
    window.document.body.style.overflow = 'hidden'
    return () => {
      window.document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.loading__component}>
      <div className={styles.loading__component__loader} />
    </div>
  )
}

