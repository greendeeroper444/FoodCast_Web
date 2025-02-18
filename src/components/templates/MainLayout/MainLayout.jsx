import React from 'react'
import styles from './MainLayout.module.css';
import Sidebar from '../../organisms/Sidebar/SideBar';
import Navbar from '../../organisms/Navbar/NavBar';
import { useDispatch } from 'react-redux';
import MenuButton from '../../molecules/MenuButton/MenuButton';
import { toggleSidebar } from '../../../redux/slices/SidebarSlice';


function MainLayout({children}) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleSidebar());
    };

  return (
    <div className={styles.mainLayout}>
        <Sidebar />
        {/* <Navbar /> */}
        <div className={styles.menuContainer}>
            <MenuButton handleClick={handleClick}/>
        </div>
        <div className={styles.mainContent}>
            <div className={styles.pageContent}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default MainLayout
