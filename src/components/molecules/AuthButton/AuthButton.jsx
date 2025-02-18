import React from 'react'
import styles from './AuthButton.module.css'
import Button from '../../atoms/Button/Button'

function AuthButton({handleAuthButton, children}) {
  return (
    <Button
        className={styles.authButton}
        onClick={handleAuthButton}
    >
        {children}
    </Button>
  )
}

export default AuthButton