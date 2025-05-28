import React from "react";
import styles from "./ObjectiveItem.module.scss";
import ChurchIcon from '@mui/icons-material/Church';

type ObjectiveItemProps = {
    icon?: string;
    title?: string;
    description?: string;
};

const iconMap: Record<string, React.ReactNode> = {
    Church: <ChurchIcon />
};


export const ObjectiveItem = ({ icon, title, description }: ObjectiveItemProps) => {
    return (
        <div className={styles.objectives__item}>
            <div className={styles.objectives__item__header}>
                {icon && (
                    <div className={styles.objectives__item__header__icon}>
                        {icon && iconMap[icon as string]}
                    </div>
                )}
            </div>
            <div className={styles.objectives__item__content}>
                <h4>{title}</h4>
                <span>{description}</span>
            </div>
        </div>
    );
};