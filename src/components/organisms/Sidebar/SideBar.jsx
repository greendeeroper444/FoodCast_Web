import React, { useEffect, useRef } from 'react'
import styles from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../atoms/Logo/Logo';
import UserNamePosition from '../../molecules/UserNamePosition/UserNamePosition';
import LogoutButton from '../../molecules/LogoutButton/LogoutButton';
import NavLink from '../../atoms/NavLink/NavLink';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { closeLogoutModal, openLogoutModal } from '../../../redux/slices/LogoutSlice';
import { handleClickOutside } from '../../../utils/handleClickOutside.js';
import ModalConfirmation from '../ModalConfirmation/ModalConfirmation';
import { logoutAdmin } from '../../../redux/actions/AdminActions/AdminAuthAction';
import { toggleSidebar } from '../../../redux/slices/SidebarSlice';

function Sidebar() {
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
    const isModalOpen = useSelector((state) => state.logout.isModalOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fullName = useSelector((state) => state.admin?.admin?.fullName);
    const sidebarRef = useRef(null);

    //logout
    const handleLogout = () => {
        dispatch(logoutAdmin());
        navigate('/');
        toast.success(`Bye ${fullName.split(' ')[0]} 🖐️, See you soon!!!`);
    };

    //handle closing the sudebar when clicking outside
    useEffect(() => {
        if (isSidebarOpen) {
            const outsideClickHandler = handleClickOutside(sidebarRef, () => dispatch(toggleSidebar()));
            document.addEventListener('mousedown', outsideClickHandler);
            return () => {
                document.removeEventListener('mousedown', outsideClickHandler);
            };
        }
    }, [isSidebarOpen, dispatch]);


  return (
    <>
        <div
            ref={sidebarRef}
            className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
        >
            <Logo />
            <UserNamePosition />
            <div className={styles.sidebarGroupContainer}>
                <div className={styles.sidebarGroup}>
                    {/* <div className={styles.sidebarGroupTitle}>Dashboard</div> */}
                    <NavLink 
                        to='/dashboard'
                        icon='fa-dashboard'
                        label='Dashboard'
                    />
                    <NavLink 
                        to='/calendar'
                        icon='fa-calendar'
                        label='Calendar'
                    />
                    {/* <NavLink 
                        to='/home'
                        icon='fa-home'
                        label='Testing Page'
                    /> */}
                </div>
                <div className={styles.sidebarGroup}>
                    {/* <div className={styles.sidebarGroupTitle}>Main Menu</div> */}
                    <NavLink 
                        to='/seasonal-forecast'
                        icon='fa-seasonal-forecast'
                        label='Seasonal Forecast'
                    />
                    <NavLink 
                        to='/map'
                        icon='fa-map'
                        label='Map'
                    />
                    <NavLink 
                        to='/collected'
                        icon='fa-collected'
                        label='Collected'
                    />
                    <NavLink 
                        to='/collected-demand'
                        icon='fa-supply'
                        label='Collected Demand'
                    />
                    <NavLink 
                        to='/price-trends'
                        icon='fa-trend'
                        label='Price Trends'
                    />
                    <NavLink 
                        to='/crop-management'
                        icon='fa-crop'
                        label='Crops Management'
                    />
                    <NavLink 
                        to='/users-management'
                        icon='fa-partners-management'
                        label='Users Management'
                    />
                </div>
                <div className={styles.sidebarGroup}>
                    {/* <div className={styles.sidebarGroupTitle}>Setting</div> */}
                    <NavLink 
                        to='/settings'
                        icon='fa-setting'
                        label='Settings'
                    />
                </div>
            </div>
            <div className={styles.logoutLink}>
                <LogoutButton onClick={() => dispatch(openLogoutModal())} />
            </div>
        </div>
        {
            isModalOpen && <ModalConfirmation
            onClose={() => dispatch(closeLogoutModal())} 
            onLogout={handleLogout} />
        }
    </>
  )
}

export default Sidebar