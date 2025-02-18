import React from 'react'
import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <Link to='/' className={styles.goHomeLink}>
            Go Back Home
        </Link>
    </div>
  )
}

export default NotFoundPage