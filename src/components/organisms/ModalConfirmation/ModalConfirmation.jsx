import React, { useEffect, useState } from 'react'
import styles from './ModalConfirmation.module.css';
import ModalFooter from '../../molecules/ModalFooter/ModalFooter';

function ModalConfirmation({title, onClose, onClick}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
        onClose();
        }, 400);
    };

  return (
    <div className={`${styles.modalBackdrop} ${isVisible ? styles.show : ''}`} onClick={handleClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalBody}>
                <p>Are you sure you want to {title} ?</p>
            </div>
            <ModalFooter
                onSave={onClick} 
                onCancel={handleClose} 
                saveLabel='Yes' 
                cancelLabel='No'
                saveClassName={styles.yesButton}
                cancelClassName={styles.noButton}
            />
        </div>
    </div>
  )
}

export default ModalConfirmation
