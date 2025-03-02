import React, { useEffect, useState } from 'react'
import styles from './UserManagementPage.module.css';
import SupplierComponent from './components/SupplierComponent/SupplierComponent';
import CollectorComponent from './components/CollectorComponent/CollectorComponent';
import VendorComponent from './components/VendorComponent/VendorComponent';
import HeaderForm from '../../molecules/HeaderForm/HeaderForm';
import PartnersManagementLight from '../../../assets/icons/partners-management-light.svg';
import { useLocation } from 'react-router-dom';


function UserManagementPage() {
    // const [activeComponent, setActiveComponent] = useState('Suppliers');
    // const location = useLocation();
    const storedComponent = localStorage.getItem('activeUserComponent') || 'Suppliers';
    const [activeComponent, setActiveComponent] = useState(storedComponent);
    const location = useLocation();

    //displaying component based on notification list clicked
    // useEffect(() => {
    //     if (location.state?.activeComponent) {
    //         setActiveComponent(location.state.activeComponent);
    //     }
    // }, [location.state]);

    //set component based on navigation state or stored value
    useEffect(() => {
        if (location.state?.activeComponent) {
            setActiveComponent(location.state.activeComponent);
            localStorage.setItem('activeUserComponent', location.state.activeComponent);
        }
    }, [location.state]);

    //update localStorage whenever activeComponent changes
    useEffect(() => {
        localStorage.setItem('activeUserComponent', activeComponent);
    }, [activeComponent]);

    const renderComponent = () => {
        switch (activeComponent) {
        case 'Suppliers':
            return <SupplierComponent />;
        case 'Collectors':
            return <CollectorComponent />;
        case 'Vendors':
            return <VendorComponent />;
        default:
            return <SupplierComponent />;
        }
    };
    
  return (
    <div>
        <HeaderForm icon={PartnersManagementLight} title='USERS MANAGEMENT' />
        <div className={styles.usersManagementPage}>
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>Users</h2>
                <ul className={styles.menuList}>
                    <li
                        className={`${styles.menuItem} ${activeComponent === 'Suppliers' ? styles.active : ''}`}
                        onClick={() => setActiveComponent('Suppliers')}
                    >
                        Suppliers (Supply)
                    </li>
                    <li
                        className={`${styles.menuItem} ${activeComponent === 'Collectors' ? styles.active : ''}`}
                        onClick={() => setActiveComponent('Collectors')}
                    >
                        Collectors (Collected)
                    </li>
                    <li
                        className={`${styles.menuItem} ${activeComponent === 'Vendors' ? styles.active : ''}`}
                        onClick={() => setActiveComponent('Vendors')}
                    >
                        Vendors (Waste)
                    </li>
                </ul>
            </aside>

            <div className={styles.componentContainer}>
                {renderComponent()}
            </div>
        </div>
    </div>
  )
}

export default UserManagementPage
