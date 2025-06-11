import React, {  useId } from 'react'
import styles from './ToggleButton.module.scss'

type ToggleButtonProps = {
    label?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export const ToggleButton = ({ label, value, onChange }: ToggleButtonProps) => {
    const uniqueId = useId();

    const handleToggle = () => {
        onChange(!value)
    }

    return (
        <div className={`${styles.toggleButton__section} ${value?styles.active:''}`}>
            {label && <label htmlFor={"toggleInput"} className={styles.toggleButton__label}>{label}</label>}
            <input
                id={`toggle-button-${uniqueId}`}
                className={styles.toggleButton__section__input} 
                type="checkbox" 
                checked={value}
                onChange={handleToggle}
            />
            <label htmlFor={`toggle-button-${uniqueId}`} className={`${styles.toggleButton__section__button} ${value?styles.active:''}`}>
                <div className={styles.toggleButton__section__button__circle}></div>
            </label>
        </div>
    )
}