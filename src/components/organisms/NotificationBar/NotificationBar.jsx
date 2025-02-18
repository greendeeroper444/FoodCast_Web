import React, { useState } from 'react'
import styles from './NotificationBar.module.css';
import NotificationForm from '../../molecules/NotificationForm/NotificationForm';
import { useSelector } from 'react-redux';

function NotificationBar() {
    const isOpen = useSelector((state) => state.notification.isOpen);

  return (
    <div className={styles.notificationBar}>
        {isOpen && <NotificationForm />}
    </div>
  )
}

export default NotificationBar