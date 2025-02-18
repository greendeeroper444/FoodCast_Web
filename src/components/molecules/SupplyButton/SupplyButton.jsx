import React from 'react'
import styles from './SupplyButton.module.css';
import Button from '../../atoms/Button/Button';


const SupplyButton = ({label, onClick, isActive}) => {
  return (
    <Button
        className={`${styles.supplyButton} ${isActive ? styles.active : ''}`}
        onClick={onClick}
    >
        {label}
    </Button>
  )
}

export default SupplyButton
