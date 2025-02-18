import React from 'react'
import styles from './Label.module.css'

function Label({text, ...props}) {
  return (
    <label className={styles.label} {...props}>{text}</label>
  )
}

export default Label