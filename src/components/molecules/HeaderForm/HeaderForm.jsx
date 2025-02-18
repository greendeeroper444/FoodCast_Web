// import React from 'react'
// import styles from './HeaderForm.module.css';
// import Header from '../../atoms/Header/Header';

// function HeaderForm({title, icon}) {
//   return (
//     <div className={styles.headerForm}>
//         <Header title={title} icon={icon} />
//     </div>
//   )
// }

// export default HeaderForm
import React, { useState } from 'react'
import styles from './HeaderForm.module.css';
import Header from '../../atoms/Header/Header';
import Notification from '../../atoms/Notification/Notification';
import NotificationForm from '../NotificationForm/NotificationForm';

function HeaderForm({ title, icon }) {
    const [showNotifications, setShowNotifications] = useState(false);

    const handleNotificationClick = () => {
        setShowNotifications((prevState) => !prevState);
    };

  return (
    <div className={styles.headerForm}>
        <Header title={title} icon={icon} />
        <div className={styles.notificationContainer}>
            <Notification onClick={handleNotificationClick} />
            {
                showNotifications && (
                <div className={styles.notificationList}>
                    <NotificationForm />
                </div>
                )
            }
        </div>
    </div>
  )
}

export default HeaderForm
