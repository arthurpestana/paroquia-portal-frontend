import React from "react";
import styles from "./ObjectiveItem.module.scss";
import { ChurchOutlined } from "@mui/icons-material";


type ObjectiveItemProps = {
    icon?: string;
    title?: string;
    description?: string;
};

const iconMap: Record<string, React.ReactNode> = {
    Church: <ChurchOutlined />
};


export const ObjectiveItem = ({ icon, title, description }: ObjectiveItemProps) => {

    console.log("ObjectiveItem rendered with props:", { icon, title, description });

    return (
        <div className={`${styles.objectivesItem__content} ${description ? styles.hasDescription : ''}`}>
            <div className={styles.objectivesItem__content__header}>
                {icon && (
                    <div className={styles.objectivesItem__content__header__icon}>
                        {icon && iconMap[icon as string]}
                    </div>
                )}
            </div>
            <div className={styles.objectivesItem__content__content}>
                <h5>{title}</h5>
                <span>{description}</span>
            </div>
        </div>
    );
};