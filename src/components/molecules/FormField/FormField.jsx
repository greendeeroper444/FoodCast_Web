import React from 'react'
import styles from './FormField.module.css';
import Label from '../../atoms/Label/Label';
import Input from '../../atoms/Input/Input';

const FormField = ({label, name, type, value, onChange}) => {
  return (
    <div className={styles.formField}>
        <Label text={label} />
        <Input type={type} name={name} value={value} onChange={onChange} />
    </div>
  )
}

export default FormField
