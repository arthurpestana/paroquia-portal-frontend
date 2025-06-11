import React, { ReactNode } from 'react'
import styles from './List.module.scss'
import { PaginationSection } from '../PaginationSection'

interface ListProps {
    children?: ReactNode
    pageValue: number
    setPageValue: (value: number) => void
    totalPages: number
}

export const List = ({ children, pageValue, setPageValue, totalPages }: ListProps) => {
    return (
        <div className={styles.list}>
            <div className={`${styles.list__section}`}>
                {children}
            </div>
            {totalPages > 1 && <PaginationSection pageValue={pageValue} setPageValue={setPageValue} totalPages={totalPages} />}
        </div>
    )
}