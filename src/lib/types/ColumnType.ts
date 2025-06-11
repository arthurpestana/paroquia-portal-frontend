import { ReactNode } from "react"

export interface ColumnType {
    header: string
    data: ReactNode
    mini?: boolean
    fullSize?: boolean
}
