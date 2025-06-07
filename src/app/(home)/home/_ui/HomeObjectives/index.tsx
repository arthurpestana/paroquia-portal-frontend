import React from 'react'
import styles from './HomeObjectives.module.scss'
import { SectionTitle } from '@/components/comp/SectionTitle'
import ObjectivesInfo from "@/lib/data/home/objectivesInfo.json"
import { ObjectiveItem } from './ObjectiveItem'

export const HomeObjectives = () => {
    return (
        <div className={styles.objectives_content}>
            <SectionTitle
                title='Valores da Paróquia'
                subtitle='Objetivos'
                align='center'
            />
            <div className={styles.objectives_content_main}>
                {ObjectivesInfo.map(((obj, index) => (
                    <ObjectiveItem
                        key={index}
                        title={obj.title}
                        description={obj.description}
                        icon={obj.icon}
                    />
                )))}
            </div>
        </div>
    )
}