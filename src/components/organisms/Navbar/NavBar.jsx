import React from 'react'
import styles from './NavBar.module.css';
import MenuButton from '../../molecules/MenuButton/MenuButton';
import imageSrc from '../../../assets/navbar/greendee.jpg';
import SearchBar from '../../atoms/SearchBar/SearchBar';
import Notification from '../../atoms/Notification/Notification';
import UserProfile from '../../molecules/UserProfile/UserProfile';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../redux/slices/SidebarSlice';
import { toggleNotificationBar } from '../../../redux/slices/NotificationSlice';
import NotificationBar from '../NotificationBar/NotificationBar';


function Navbar() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleSidebar());
    };

    const handleNotificationClick = () => {
        dispatch(toggleNotificationBar());
    };

  return (
    <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
            <MenuButton handleClick={handleClick} />
        </div>
        <div className={styles.navbarRight}>
            <SearchBar />
            <Notification onClick={handleNotificationClick} />
            <UserProfile imageSrc={imageSrc} />
        </div>
        <NotificationBar />
    </div>
  )
}

export default Navbar
