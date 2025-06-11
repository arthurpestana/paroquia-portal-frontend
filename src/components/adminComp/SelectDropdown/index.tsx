/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import styles from './SelectDropdown.module.scss'
import { ChevronLeft } from '@mui/icons-material'
import { NoContent } from '../NoContent'
import { TextInput } from '@/components/comp/TextInput'

const STORAGE_KEY = 'activeSelectDropdown'

interface SelectDropdownProps {
    data: any[]
    activeOption?: any
    setActiveOption: (option: any) => void
    label?: string
    required?: boolean
    searchValue?: string
    setSearchValue?: (value: string) => void
    optionField?: string | string[]
    disabled?: boolean
}

export const SelectDropdown = ({
    data,
    activeOption,
    setActiveOption,
    label,
    required,
    searchValue,
    setSearchValue,
    optionField,
    disabled = false
}: SelectDropdownProps) => {
    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const [dropdownId] = useState(() => Math.random().toString(36).substring(2))

    const toggleDropdown = () => {
        const current = sessionStorage.getItem(STORAGE_KEY)
        const isThisActive = current === dropdownId

        if (isThisActive) {
            sessionStorage.removeItem(STORAGE_KEY)
            setIsDropdownActive(false)
        } else {
            sessionStorage.setItem(STORAGE_KEY, dropdownId)
            window.dispatchEvent(new CustomEvent('dropdownToggle'))
            setIsDropdownActive(true)
        }
    }

    useEffect(() => {
        const handleDropdownToggle = () => {
            const activeId = sessionStorage.getItem(STORAGE_KEY)
            setIsDropdownActive(activeId === dropdownId)
        }

        window.addEventListener('dropdownToggle', handleDropdownToggle)
        window.addEventListener('storage', handleDropdownToggle)

        return () => {
            window.removeEventListener('dropdownToggle', handleDropdownToggle)
            window.removeEventListener('storage', handleDropdownToggle)
        }
    }, [dropdownId])

    const handleSelect = (option: any) => {
        if (!disabled) {
            setActiveOption(option)
            setIsDropdownActive(false)
            sessionStorage.removeItem(STORAGE_KEY)
        }
    }

    return (
        <div className={`${styles.select__section} ${disabled ? styles.disabled : ''}`}>
            {label && (
                <div className={styles.select__section__label}>
                    <span>{label} {required && '*'}</span>
                </div>
            )}
            <div
                className={`${styles.select__section__header} ${disabled ? styles.disabled : ''}`}
                onClick={() => !disabled && toggleDropdown()}
            >
                <div className={`${styles.select__section__header__activeOption} ${!activeOption ? styles.empty : ''}`}>
                    <span>{typeof activeOption === 'string' && activeOption ? activeOption : activeOption && optionField
                        ? Array.isArray(optionField)
                            ? optionField?.map(field => activeOption?.[field]).filter(Boolean).join(' - ')
                            : activeOption?.[optionField] ? activeOption?.[optionField] : 'Selecione uma opção'
                        : 'Selecione uma opção'}</span>
                </div>
                <div className={`${styles.select__section__header__icon} ${isDropdownActive ? styles.active : ''}`}>
                    <ChevronLeft />
                </div>
            </div>
            {isDropdownActive && !disabled && (
                <div
                    className={styles.select__section__content}
                    style={{
                        maxHeight: `${3 * 50}px`,
                        overflowY: data?.length >= 3 ? 'auto' : 'hidden'
                    }}
                >
                    {(searchValue !== undefined && setSearchValue) && (
                        <div className={styles.select__section__content__input}>
                            <TextInput type="text" placeholder="Pesquisar" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} variant='floating' name='search'/>
                        </div>
                    )}
                    {data?.length <= 0 || !data
                        ? <NoContent text="Nenhum dado encontrado" mini />
                        : data.map((option, index) => (
                            <div key={index} onClick={() => handleSelect(option)} className={styles.select__section__content__item}>
                                <span>
                                    {optionField
                                        ? Array.isArray(optionField)
                                            ? optionField.map(field => option?.[field]).filter(Boolean).join(' - ')
                                            : option?.[optionField]
                                        : option}
                                </span>
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
