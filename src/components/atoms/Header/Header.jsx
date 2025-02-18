import React from 'react'
import styles from './Header.module.css'; 

function Header({title, icon, ...props}) {
  return (
    <header className={styles.header} {...props}>
        {icon && <img src={icon} alt={`${title} icon`} className={styles.icon} />}
        <h1 className={styles.title}>{title}</h1>
    </header>
  )
}

export default Header