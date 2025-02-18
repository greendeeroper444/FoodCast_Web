import React, { useState } from 'react';
import styles from './NotificationComponent.module.css';

function NotificationComponent() {
    const [notifications, setNotifications] = useState({
        main: true,
        sound: true,
        forecast: true,
        lowStock: true,
        dataReminder: true,
    });

    const toggleNotification = (type) => {
        setNotifications((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

  return (
    <div className={styles.notificationContent}>
        <div className={styles.section}>
            <label className={styles.toggleContainer}>
                Turn on/off notifications
                <input
                    type="checkbox"
                    checked={notifications.main}
                    onChange={() => toggleNotification('main')}
                />
                <span className={styles.slider}></span>
            </label>

                <label className={styles.toggleContainer}>
                <span role="img" aria-label="sound">🔊</span> Enable sound
                <input
                    type="checkbox"
                    checked={notifications.sound}
                    onChange={() => toggleNotification('sound')}
                />
                <span className={styles.slider}></span>
            </label>
        </div>

        <h3 className={styles.sectionTitle}>Task Notifications</h3>
        <div className={styles.section}>
            <label className={styles.toggleContainer}>
                Forecast Update Notification
                <input
                    type="checkbox"
                    checked={notifications.forecast}
                    onChange={() => toggleNotification('forecast')}
                />
                <span className={styles.slider}></span>
            </label>

            <label className={styles.toggleContainer}>
                Low Stock Prediction Alert
                <input
                    type="checkbox"
                    checked={notifications.lowStock}
                    onChange={() => toggleNotification('lowStock')}
                />
                <span className={styles.slider}></span>
            </label>

            <label className={styles.toggleContainer}>
                Data Input Reminder
                <input
                    type="checkbox"
                    checked={notifications.dataReminder}
                    onChange={() => toggleNotification('dataReminder')}
                />
                <span className={styles.slider}></span>
            </label>
        </div>
    </div>
  )
}

export default NotificationComponent
