'use client';
import React, { useState } from 'react';
import styles from './page.module.scss';

const ParoquiaEvolved = [
  { nome: 'Paróquia 1', imagem: 'paroquia/paroquia-1.png' },
  { nome: 'Paróquia 2', imagem: 'paroquia/paroquia-5.png' },
  { nome: 'Paróquia 5', imagem: 'paroquia/paroquia-2.jpeg' },
  { nome: 'Paróquia 4', imagem: 'paroquia/paroquia-4.png' },
  { nome: 'Paróquia 3', imagem: 'paroquia/paroquia-3.png' }
];

export default function ParoquiaTimeline() {
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.timeline_container}>
      {ParoquiaEvolved.map((paroquia, index) => {
        const isHovered = hoveredIndex === index;
        const cardClass =
          hoveredIndex === null
            ? styles.default
            : isHovered
            ? styles.expanded
            : styles.collapsed;

        return (
          <div
            key={index}
            className={`${styles.timeline_container_card} ${cardClass}`}
            style={{ backgroundImage: `url(/images/${paroquia.imagem})` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        );
      })}
    </div>
  );
}
