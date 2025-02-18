import React from 'react'
import styles from './RegisterPage.module.css';
import sidebarBg from '../../../assets/images/sidebar-bg.png';
import logoImage from '../../../assets/signin/veggiety-logo.png';
import RegisterForm from '../../organisms/RegisterForm/RegisterForm';

function RegisterPage() {
  return (
    <div className={styles.registerPage}>
        <div className={styles.registerLeft}>
            <img src={sidebarBg} alt="Sidebar Background" className={styles.sidebarBg} />
        </div>
        <div className={styles.registerRight}>
            <div className={styles.logoContainer}>
                <img src={logoImage} alt="Tagum City Economic Enterprise Office" className={styles.logoImage} />
                <div className={styles.logoText}>
                    Tagum City Economic<br />
                    Enterprise Office
                </div>
            </div>
            <RegisterForm className={styles.registerForm} />
        </div>
    </div>
  )
}

export default RegisterPage