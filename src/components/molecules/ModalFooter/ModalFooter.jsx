import React from 'react'
import styles from './ModalFooter.module.css';
import Button from '../../atoms/Button/Button';

const ModalFooter = ({onSave, onCancel, cancelLabel = 'Cancel', saveLabel = 'Save', saveClassName, cancelClassName}) => {
  return (
    <div className={styles.modalFooter}>
        {cancelLabel && <Button onClick={onCancel} className={cancelClassName}>{cancelLabel}</Button>}
        {saveLabel && <Button onClick={onSave} className={saveClassName}>{saveLabel}</Button>}
    </div>
  )
}

export default ModalFooter
