import React, { useEffect, useState } from 'react'
import styles from './Modal.module.css';
import ModalHeader from '../../molecules/ModalHeader/ModalHeader';
import ModalFooter from '../../molecules/ModalFooter/ModalFooter';

const Modal = ({
    title, 
    children, 
    onClose, 
    onSave, 
    onApprove, 
    hideFooter = false,
    unHideApproveButton = false
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 400);
    };

  return (
    <div className={`${styles.modalBackdrop} ${isVisible ? styles.show : ''}`} onClick={handleClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <ModalHeader title={title} onClose={handleClose} />
            <div className={styles.bodyAndFooter}>
                <div className={styles.modalBody}>
                    {children}
                </div>
                {
                    !hideFooter && (
                        <ModalFooter 
                            onCancel={handleClose} 
                            onSave={onSave} 
                            onApprove={onApprove}
                            cancelLabel='Cancel'
                            saveLabel='Save' 
                            approveLabel='Approve'
                            cancelClassName={styles.cancelButton}
                            saveClassName={styles.submitButton}
                            approveClassName={styles.approveButton}
                            unHideApproveButton={unHideApproveButton}
                        />
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Modal
