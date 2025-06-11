import React from 'react'
import t from './Textarea.module.scss'

type TextareaProps = {
    label?: string
    placeholder: string
    value: string
    onChange?: (value: string) => void
    required?: boolean
    tableInput?: boolean
    onBlur?: () => void,
    disableEnter?: boolean,
    max?: number
}

export const Textarea = ({
    label,
    placeholder,
    value,
    onChange,
    required,
    tableInput,
    onBlur,
    disableEnter,
    max
}: TextareaProps) => {
    return (
        <div className={`${tableInput ? t.tableInput : t.textarea__main}`}>
            {label && (
                <label className={`${t.textarea__label} ${required ? t.required : ''}`}>
                    {label}
                    {required ? <span> *</span> : ''}
                </label>
            )}
            <textarea
                className={`${t.textarea__input} ${disableEnter ? t.disableEnter : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                onBlur={onBlur}
                onKeyDown={(e) => {
                    if (disableEnter && e.key === 'Enter') {
                        e.preventDefault();
                    }
                }}
                maxLength={max}
            />
        </div>
    )
}
