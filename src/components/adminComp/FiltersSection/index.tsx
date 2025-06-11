import React from 'react'
import styles from './FiltersSection.module.scss'
import { SearchOutlined, AddBoxOutlined } from '@mui/icons-material'
import { TextInput } from '@/components/comp/TextInput'
import { Button } from '@/components/comp/Button'
import { LabelIcon } from '@/components/comp/LabelIcon'

type FiltersSectionProps = {
    searchValue: string
    setSearchValue: (value: string) => void
    handleFilters?: () => void
    handleAddClick?: () => void
}

export const FiltersSection = ({ searchValue, setSearchValue, handleFilters, handleAddClick }: FiltersSectionProps) => {

    return (
        <div className={styles.filterSection__content}>
            <div className={styles.filterSection__content__search}>
                <TextInput
                    label={<LabelIcon icon={<SearchOutlined />} label={'Pesquisar'} iconPosition='left' />}
                    name='search'
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Pesquisar"
                    variant='floating'
                    className={styles.filterSection__content__search__input}
                />

                <Button icon={<SearchOutlined />} type="button" onClick={handleFilters} darkMode variant='contained' className={styles.filterSection__content__search__button}/>
            </div>
            {handleAddClick && <div className={styles.filterSection__content__buttons}>
                {handleAddClick && (
                    <Button icon={<AddBoxOutlined />} label={'Adicionar'} onClick={handleAddClick} darkMode className={styles.filterSection__content__buttons__add}/>
                )}
            </div>}
        </div>
    )
}
