import React from 'react'
import styles from './ModalHeader.module.css';
import Button from '../../atoms/Button/Button';
import timesIcon from '../../../assets/icons/times-light.svg';


const ModalHeader = ({title, onClose}) => {
  return (
    <div className={styles.modalHeader}>
        <h2>{title}</h2>
        <Button 
          onClick={onClose} 
          iconPosition='right' 
          icon={timesIcon} 
          className={styles.modalButtonTimes}
        />
    </div>
  )
}

export default ModalHeader
