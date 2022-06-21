import React from 'react';
import styles from './SectionTitle.module.scss';

function SectionTitle({ title, desc }) {
  return (
    <div className={`container ${styles.sectionTitle}`}>
      <span className={styles.title}>{title}</span>
      <span className={styles.desc}>{desc}</span>
    </div>
  );
}

export default SectionTitle;
