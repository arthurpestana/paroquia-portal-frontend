import React from 'react'
import styles from './PaginationSection.module.scss'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

type PaginationSectionProps = {
    pageValue: number
    setPageValue: (value: number) => void
    totalPages: number
}

export const PaginationSection = ({ pageValue, setPageValue, totalPages }: PaginationSectionProps) => {
    const getDisplayedPages = () => {
        const pages: number[] = []
        const startPage = Math.max(0, pageValue - 1)
        const endPage = Math.min(totalPages, pageValue + 2)

        for (let i = startPage; i < endPage; i++) {
            pages.push(i)
        }
        return pages
    }

    return (
        <div className={`${styles.pagination__section}`}>
            {pageValue > 0 && (
                <div className={styles.pagination__section__index}>
                    <span onClick={() => setPageValue(Math.max(pageValue - 1, 0))}>
                        <ChevronLeft />
                    </span>
                </div>
            )}
            {pageValue >= 2 && (
                <>
                    <div className={styles.pagination__section__index} onClick={() => setPageValue(0)}>
                        <span>1</span>
                    </div>
                    {pageValue >= 3 && (
                        <div className={styles.pagination__section__index}>
                            <span>...</span>
                        </div>
                    )}
                </>
            )}
            {getDisplayedPages().map((page) => (
                <div
                    key={page}
                    className={`${styles.pagination__section__index} ${pageValue === page ? styles.active : ''}`}
                    onClick={() => setPageValue(page)}
                >
                    <span>{page + 1}</span>
                </div>
            ))}
            {totalPages >= 3 && pageValue + 2 < totalPages && (
                <>
                    {pageValue + 3 < totalPages && (
                        <div className={styles.pagination__section__index}>
                            <span>...</span>
                        </div>
                    )}
                    <div className={styles.pagination__section__index} onClick={() => setPageValue(totalPages - 1)}>
                        <span>{totalPages}</span>
                    </div>
                </>
            )}
            {pageValue + 1 < totalPages && (
                <div className={styles.pagination__section__index}>
                    <span onClick={() => setPageValue(Math.min(pageValue + 1, totalPages - 1))}>
                        <ChevronRight />
                    </span>
                </div>
            )}
        </div>
    )
}
