import React from 'react'
import styles from './Card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Card({type, title, amount, percentage, icon, onClick, className}) {
  return (
    <div className={`${styles.card} ${styles[type]} ${className}`} onClick={onClick}>
        <h2>{title}</h2>
        <div className={styles.amount}>{amount}</div>
        <div className={styles.percentage}>{percentage}</div>
        <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={icon} />
        </div>
    </div>
  )
}

export default Card