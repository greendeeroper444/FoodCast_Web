import React, { useEffect, useState } from 'react'
import styles from './NotificationForm.module.css';
import { useNavigate } from 'react-router-dom';
import { formatRelativeTime } from '../../../utils/dateUtils';
import api from '../../../api/api';
import io from 'socket.io-client';

function NotificationForm() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const socket = io(import.meta.env.BASE_URL);

    useEffect(() => {
        //fetch initial notifications
        api.get('/adminNotification/getNotifications')
            .then((response) => setNotifications(response.data))
            .catch((error) => console.error('Error fetching notifications:', error));
    
        //listen for real-time notifications
        socket.on('newSupplyNotification', (notifications) => {
            // setNotifications((prev) => [notifications, ...prev]); //prepend new notification
            setNotifications(notifications); //prepend new notification
        });
    
        return () => {
            socket.off('newSupplyNotification');
        };
    }, []);
    

    const handleNotificationClick = (notificationId, notification) => {
        api.put(`/adminNotification/markNotificationAsRead/${notificationId}`)
            .then((response) => {
                const updatedNotification = response.data;
                
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notif) =>
                        notif._id === updatedNotification._id ? updatedNotification : notif
                    )
                );
            })
            .catch((error) => console.error('Error updating notification:', error));
    
        //navigate to the settings page
        if (notification.message.includes('kilos')) {
            navigate('/users-management', { state: { activeComponent: 'Collectors' } });
        } else  if (notification.message.includes('waste')) {
            navigate('/users-management', { state: { activeComponent: 'Vendors' } });
        } else if (notification.message.includes('requested to be')) {
            navigate('/settings', { state: { activeComponent: 'Manage Users' } });
        }
    };
    

  return (
    <div className={styles.notificationForm}>
        <div className={styles.notificationHeader}>Notifications</div>
        {
            notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div 
                        key={notification._id}
                        className={`${styles.notificationItem} ${
                            !notification.read ? styles.unread : ''
                        }`}
                        onClick={() => handleNotificationClick(notification._id, notification)}
                    >
                    
                        <div className={styles.notificationContent}>
                            <img src={notification.profilePicture} className={styles.profilePicture} alt="" />
                            {/* <div
                                className={styles.notificationMessage}
                                // dangerouslySetInnerHTML={{ __html: notification.message }}
                            >
                                {notification.fullName}
                                {' '}
                                {notification.message}
                            </div> */}
                            <div>
                                <div className={styles.notificationMessage}>
                                    <strong>{notification.fullName}</strong> {notification.message}
                                </div>
                                <div className={styles.notificationTimestamp}>
                                    {formatRelativeTime(notification.updatedAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={styles.noNotifications}>No new notifications</div>
            )
        }
    </div>
  )
}

export default NotificationForm
