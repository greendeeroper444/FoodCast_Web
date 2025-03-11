import React, { useEffect, useState } from 'react'
import styles from './Notification.module.css';
import BellIcon from '../../../assets/icons/bell-light.svg';
import api from '../../../api/api';
import io from 'socket.io-client';
import bellSound from '../../../assets/mp3/bell.mp3';

function Notification({ onClick }) {
    const [unreadCount, setUnreadCount] = useState(0);
    // const socket = io('http://localhost:8080');
    const socket = io(import.meta.env.BASE_URL);

    useEffect(() => {
        //fetch initial unread count
        const fetchUnreadCount = async () => {
            try {
                const response = await api.get('/api/adminNotification/getUnreadCount');
                setUnreadCount(response.data.unreadCount);
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        fetchUnreadCount();

        //listen for real-time notifications
        socket.on('newNotification', () => {
            //play notification sound
            const audio = new Audio(bellSound);
            audio.play();

            //fetch unread count again from the server to ensure accuracy
            fetchUnreadCount();
        });

        return () => {
            socket.off('newNotification');
        };
    }, []);

  return (
    <div className={styles.notification} onClick={onClick}>
        <img src={BellIcon} alt="Notification" className={styles.notificationIcon} />
        {
            unreadCount > 0 && (
                <span className={styles.notificationBadge}>{unreadCount}</span>
            )
        }
    </div>
  )
}

export default Notification
