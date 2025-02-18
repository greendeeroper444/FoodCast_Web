import React from 'react'
import styles from './Button.module.css';

const Button = ({children, className, icon, iconPosition = 'left', ...props}) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
        {icon && iconPosition === 'left' && <img src={icon} className={styles.icon} alt="Icon" />}
        {children}
        {icon && iconPosition === 'right' && <img src={icon} className={styles.icon} alt="Icon" />}
    </button>
  )
}

export default Button
