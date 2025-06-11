import React from 'react';
import styles from './ListContent.module.scss';
import { ColumnType } from '@/lib/types/ColumnType';
import { ListRow } from '../ListRow';

type ListContentProps = {
    index: number;
    columns: ColumnType[];
    listHeader?: boolean;
}

export const ListContent = ({
    index,
    columns,
    listHeader,
}: ListContentProps) => {
    return (
        <ListRow>
            {index === 0 && listHeader && (
                <div className={styles.list__row__header}>
                    {columns?.map((column: ColumnType, idx: number) => (
                        <div
                            key={`header-${idx}`}
                            className={`${styles.list__row__header__item} ${column.mini ? styles.mini : ''}`}
                        >
                            <h1>{column.header}</h1>
                        </div>
                    ))}
                </div>
            )}
            <div className={styles.list__row}>
                {columns.map((column, colIndex) => (
                    <div
                        key={`column-${colIndex}`}
                        className={`${styles.list__row__item} ${column.mini ? styles.mini : ''} ${column.fullSize ? styles.fullSize : ''}`}
                    >
                        {column.data}
                    </div>
                ))}
            </div>
        </ListRow>
    );
};
