import React from "react";
import styles from "./ObjectiveItem.module.scss";
import ForumIcon from '@mui/icons-material/Forum';
import SchoolIcon from '@mui/icons-material/School';
import CollectionsIcon from '@mui/icons-material/Collections';
import GroupsIcon from '@mui/icons-material/Groups';

type ObjectiveItemProps = {
    icon?: string;
    title?: string;
    description?: string;
};

const iconMap: Record<string, React.ReactNode> = {
    Forum: <ForumIcon />,
    School: <SchoolIcon />,
    Collections: <CollectionsIcon />,
    Groups: <GroupsIcon />,
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