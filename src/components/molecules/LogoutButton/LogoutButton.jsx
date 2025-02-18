import React from 'react'
import styles from './LogoutButton.module.css';
import Button from '../../atoms/Button/Button';
import LogoutLight from '../../../assets/icons/logout-light.svg';

const LogoutButton = ({onClick}) => {
  return (
    <Button
        className={styles.logoutButton}
        icon={LogoutLight}
        onClick={onClick}
		iconPosition='right'
    >
        Logout
    </Button>
  )
}

export default LogoutButton
