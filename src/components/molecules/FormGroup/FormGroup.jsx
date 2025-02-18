import React from 'react';
import styles from './FormGroup.module.css'
import InputField from '../../atoms/InputField/InputField';

function FormGroup({label, type, name, value, onChange, placeholder, required, autoComplete}) {
  return (
    <div className={styles.formGroup}>
        {/* <Label text={label} /> */}
        <InputField
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
        />
    </div>
  )
}

export default FormGroup