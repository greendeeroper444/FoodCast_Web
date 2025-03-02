import React from 'react'
import styles from './SelectField.module.css';

function SelectField({label, name, value, onChange, required, options}) {
  return (
    <div className={styles.selectField}>
        {label && <label htmlFor={name}>{label}</label>}
        <select id={name} name={name} value={value} onChange={onChange} required={required}>
            <option value="" disabled>Select an option</option>
            {
                options?.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))
            }
        </select>
    </div>
  )
}

export default SelectField
