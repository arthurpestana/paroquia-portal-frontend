import React from 'react'
import styles from './HomeObjectives.module.scss'
import { Button } from '@/components/comp/Button'
import { SectionTitle } from '@/components/comp/SectionTitle'
import ObjectivesInfo from "@/lib/data/home/objectivesInfo.json"
import { ObjectiveItem } from './ObjectiveItem'

export const HomeObjectives = () => {
    return (
        <div className={styles.objectives__content}>
            <SectionTitle
                title='Propósito do evento'
                subtitle='Objetivos'
                align='center'
            />
            <div className={styles.objectives__content__main}>
                {ObjectivesInfo.map(((obj, index) => (
                    <ObjectiveItem
                        key={index}
                        title={obj.title}
                        description={obj.description}
                        icon={obj.icon}
                    />
                )))}
            </div>
            <div className={styles.objectives__content__button}>
                <Button
                    label='Ver mais'
                    onClick={() => window.open('https://www.instagram.com/tec_inclusao/', '_blank', 'noreferrer noopener')}
                />
            </div>
        </div>
    )
}