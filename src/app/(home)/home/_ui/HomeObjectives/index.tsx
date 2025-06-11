import React from 'react'
import styles from './HomeObjectives.module.scss'
import { SectionTitle } from '@/components/comp/SectionTitle'
import ObjectivesInfo from "@/lib/data/home/objectivesInfo.json"
import { ObjectiveItem } from './ObjectiveItem'
import PastoraisInfo from '@/lib/data/history/pastoralItems.json'

export type ObjectiveInfoType = {
    icon?: string;
    title?: string;
    description?: string;
}

export const HomeObjectives = ({title}: ObjectiveInfoType) => {
    return (
        <div className={styles.homeObjectives__content}>
            <SectionTitle
                title={title || 'Valores da Paróquia'}
                subtitle='Objetivos'
                align='center'
            />
            <div className={styles.homeObjectives__content__main}>
                {
                    title ? PastoraisInfo.map((obj: ObjectiveInfoType, index: number) => (
                    <ObjectiveItem
                        key={index}
                        title={obj.title}
                        description={obj.description}
                    />
                )):
                    ObjectivesInfo.map((obj: ObjectiveInfoType, index: number) => (
                        <ObjectiveItem
                            key={index}
                            title={obj.title}
                            description={obj.description}
                            icon={obj.icon}
                        />
                    ))
                }
            </div>
        </div>
    )
}