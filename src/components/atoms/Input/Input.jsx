import React from 'react';
import styles from './Input.module.css';

const Input = ({type, name, value, onChange, placeholder, ...props}) => {
  return (
    <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder={placeholder}
        {...props}
    />
  )
}

export default Input
