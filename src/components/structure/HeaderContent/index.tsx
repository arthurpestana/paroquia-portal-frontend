import styles from "./HeaderContent.module.scss"

type HeaderContentProps = {
    children: React.ReactNode;
    height?: string;
    style?: React.CSSProperties;
}

export const HeaderContent = ({ children, height, style }: HeaderContentProps) => {
    return (
        <header
            className={styles.header_content}
            style={{ height: height, ...style }}
        >
            {children}
        </header>
    )
}