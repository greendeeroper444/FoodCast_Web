import React from 'react'
import styles from './InputField.module.css'

function InputField({type, name, value, onChange, placeholder, required, autoComplete, ...props}) {
  return (
    <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete} 
        className={styles.inputField}
        {...props}
    />
  )
}

export default InputField