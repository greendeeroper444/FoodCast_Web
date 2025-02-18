import React from 'react'
import styles from './MenuButton.module.css';
import Button from '../../atoms/Button/Button';
import MenuIcon from '../../../assets/icons/menu-light.svg';

function MenuButton({handleClick}) {

  return (
    <Button
        className={styles.menuButton}
        icon={MenuIcon}
        onClick={handleClick}
    />
  )
}

export default MenuButton