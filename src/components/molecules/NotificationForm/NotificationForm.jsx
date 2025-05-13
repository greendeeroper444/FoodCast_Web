import React, { useEffect, useState, useRef } from 'react'
import styles from './NotificationForm.module.css';
import { useNavigate } from 'react-router-dom';
import { formatRelativeTime } from '../../../utils/dateUtils';
import api from '../../../api/api';
import io from 'socket.io-client';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

function NotificationForm() {
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const socket = io(import.meta.env.BASE_URL);
    const listRef = useRef();

    useEffect(() => {
        //fetch initial notifications
        setIsLoading(true);
        api.get('/api/adminNotification/getNotifications')
            .then((response) => {
                setNotifications(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching notifications:', error);
                setIsLoading(false);
            });
    
        //listen for real-time notifications
        socket.on('newNotification', (notifications) => {
            setNotifications(notifications);
            //reset the list scroll position when new notifications arrive
            if (listRef.current) {
                listRef.current.scrollToItem(0);
            }
        });
    
        return () => {
            socket.off('newNotification');
        };
    }, []);
    
    //determine notification type
    const getNotificationType = (notification) => {
        if (notification.message.includes('kilos')) {
            return 'collector';
        } else if (notification.message.includes('waste')) {
            return 'vendor';
        } else if (notification.message.includes('requested to be')) {
            return 'user';
        }
        return 'other';
    };

    const handleNotificationClick = (notificationId, notification) => {
        api.put(`/api/adminNotification/markNotificationAsRead/${notificationId}`)
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
        } else if (notification.message.includes('waste')) {
            navigate('/users-management', { state: { activeComponent: 'Vendors' } });
        } else if (notification.message.includes('requested to be')) {
            navigate('/settings', { state: { activeComponent: 'Manage Users' } });
        }
    };

    //filter notifications based on active tab
    const filteredNotifications = notifications.filter(notification => {
        if (activeTab === 'all') return true;
        return getNotificationType(notification) === activeTab;
    });

    //get unread counts for each category
    const getUnreadCount = (type) => {
        return notifications.filter(n => !n.read && (type === 'all' || getNotificationType(n) === type)).length;
    };
    
    //format the count for display (1000 -> 1k)
    const formatCount = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return count;
    };

    //render individual notification item
    const NotificationItem = ({index, style}) => {
        const notification = filteredNotifications[index];
        const notificationType = getNotificationType(notification);
        
        return (
            <div 
                style={style}
                className={`${styles.notificationItem} ${
                    !notification.read ? styles.unread : ''
                } ${styles[notificationType]}`}
                onClick={() => handleNotificationClick(notification._id, notification)}
            >
                <div className={styles.notificationTypeIndicator}></div>
                <div className={styles.notificationContent}>
                    <img src={notification.profilePicture} className={styles.profilePicture} alt="" />
                    <div className={styles.textContent}>
                        <div className={styles.notificationMessage}>
                            <strong>{notification.fullName}</strong> {notification.message}
                        </div>
                        <div className={styles.notificationTimestamp}>
                            {formatRelativeTime(notification.createdAt)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

  return (
    <div className={styles.notificationForm}>
        <div className={styles.notificationHeader}>Notifications</div>
        
        <div className={styles.tabsContainer}>
            <button 
                className={`${styles.tab} ${activeTab === 'all' ? styles.activeTab : ''}`} 
                onClick={() => setActiveTab('all')}
            >
                All
                {getUnreadCount('all') > 0 && 
                    <span className={styles.tabBadge}>{formatCount(getUnreadCount('all'))}</span>
                }
            </button>
            <button 
                className={`${styles.tab} ${activeTab === 'vendor' ? styles.activeTab : ''}`} 
                onClick={() => setActiveTab('vendor')}
            >
                Vendors
                {getUnreadCount('vendor') > 0 && 
                    <span className={`${styles.tabBadge} ${styles.vendorBadge}`}>{formatCount(getUnreadCount('vendor'))}</span>
                }
            </button>
            <button 
                className={`${styles.tab} ${activeTab === 'collector' ? styles.activeTab : ''}`} 
                onClick={() => setActiveTab('collector')}
            >
                Collectors
                {getUnreadCount('collector') > 0 && 
                    <span className={`${styles.tabBadge} ${styles.collectorBadge}`}>{formatCount(getUnreadCount('collector'))}</span>
                }
            </button>
            <button 
                className={`${styles.tab} ${activeTab === 'user' ? styles.activeTab : ''}`} 
                onClick={() => setActiveTab('user')}
            >
                Users
                {getUnreadCount('user') > 0 && 
                    <span className={`${styles.tabBadge} ${styles.userBadge}`}>{formatCount(getUnreadCount('user'))}</span>
                }
            </button>
        </div>
        
        <div className={styles.notificationsContainer}>
            {
                isLoading ? (
                    <div className={styles.loadingState}>Loading notifications...</div>
                ) : filteredNotifications.length > 0 ? (
                    <div style={{ height: 'calc(100% - 10px)', width: '100%' }}>
                        <AutoSizer>
                            {({ height, width }) => (
                                <List
                                    ref={listRef}
                                    height={Math.min(400, filteredNotifications.length * 80)}
                                    itemCount={filteredNotifications.length}
                                    itemSize={80}
                                    width={width}
                                    overscanCount={3}
                                >
                                    {NotificationItem}
                                </List>
                            )}
                        </AutoSizer>
                    </div>
                ) : (
                    <div className={styles.noNotifications}>No notifications found</div>
                )
            }
        </div>
    </div>
  )
}

export default NotificationForm