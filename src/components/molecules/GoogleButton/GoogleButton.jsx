import React from 'react'
import styles from './GoogleButton.module.css'
import googleLogo from '../../../assets/signin/google.png';
import Button from '../../atoms/Button/Button';

function GoogleButton({children}) {
  return (
    <Button 
        className={styles.googleButton} 
        icon={googleLogo}
        iconPosition='left'
    >
        {children}
    </Button>
  )
}

export default GoogleButton