import React, { useState } from 'react'
import styles from './FileUpload.module.scss'
import { InsertPhoto as InsertPhotoIcon } from '@mui/icons-material'

type FileUploadProps = {
    label: string
    accept: string
    value: File | FileList | null
    onChange: (file: File | FileList | null) => void
    required?: boolean
    multiple?: boolean
}

export const FileUpload = ({
    label,
    accept,
    value,
    onChange,
    required,
    multiple
}: FileUploadProps) => {
    const inputId = React.useId()
    const [isDragging, setIsDragging] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
            ? multiple
                ? e.target.files
                : e.target.files[0]
            : null
        onChange(file)
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const files = e.dataTransfer.files
        if (!files || files.length === 0) return

        const file = multiple ? files : files[0]
        onChange(file)
    }

    const renderFileNames = () => {
        if (!value) return null

        if (multiple && value instanceof FileList) {
            return Array.from(value)
                .map((file) => file.name)
                .join('; ')
        }

        if (value instanceof File) {
            return value.name
        }

        return null
    }

    return (
        <div className={styles.file__main}>
            <label className={`${styles.file__label} ${required ? styles.required : ''}`}>
                {label}
                {required && <span> *</span>}
            </label>

            <label
                htmlFor={inputId}
                className={`${styles.file__input} ${isDragging ? styles.dragging : ''}`}
                onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                }}
                onDragLeave={(e) => {
                    e.preventDefault()
                    setIsDragging(false)
                }}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
            >
                <InsertPhotoIcon />
                <div className={styles.file__input__text}>
                    <p>Arraste ou selecione um arquivo</p>
                    {value && <span>{renderFileNames()}</span>}
                </div>
            </label>

            <input
                id={inputId}
                type="file"
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
                className={styles.file__hiddenInput}
            />
        </div>
    )
}
