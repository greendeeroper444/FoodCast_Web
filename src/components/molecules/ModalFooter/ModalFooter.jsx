import React from 'react'
import styles from './ModalFooter.module.css';
import Button from '../../atoms/Button/Button';

const ModalFooter = ({
    onSave, 
    onCancel, 
    onApprove,
    cancelLabel = 'Cancel', 
    saveLabel = 'Save', 
    approveLabel = 'Approve', 
    saveClassName, 
    cancelClassName, 
    approveClassName, 
    unHideApproveButton = false
}) => {
  return (
    <div className={styles.modalFooter}>
        <div>
            {cancelLabel && <Button onClick={onCancel} className={cancelClassName}>{cancelLabel}</Button>}
            {saveLabel && <Button onClick={onSave} className={saveClassName}>{saveLabel}</Button>}
        </div>
        <div>
            {
                unHideApproveButton && approveLabel && (
                    <Button onClick={onApprove} className={approveClassName}>{approveLabel}</Button>
                )
            }
        </div>

        
        
    </div>
  )
}

export default ModalFooter
