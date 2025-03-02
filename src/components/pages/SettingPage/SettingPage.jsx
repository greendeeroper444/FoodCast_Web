import React, { useEffect, useState } from 'react'
import styles from './SettingPage.module.css';
import ProfileComponent from './components/ProfileComponent/ProfileComponent';
import LoginAndSecurityComponent from './components/LoginAndSecurityComponent/LoginAndSecurityComponent';
import ManageUserComponent from './components/ManageUserComponent/ManageUserComponent';
import PreferencesComponent from './components/PreferencesComponent/PreferencesComponent';
import HelpAndSupportComponent from './components/HelpAndSupportComponent/HelpAndSupportComponent';
import TermAndConditionComponent from './components/TermAndConditionComponent/TermAndConditionComponent';
import AboutComponent from './components/AboutComponent/AboutComponent';
import { useLocation } from 'react-router-dom';


function SettingPage() {
    // const [activeComponent, setActiveComponent] = useState('Profile');
    // const [hasNotification, setHasNotification] = useState(false);
    // const location = useLocation();

    // //displaying component based on notification list clicked
    // useEffect(() => {
    //     if (location.state?.activeComponent) {
    //         setActiveComponent(location.state.activeComponent);
    //     }
    // }, [location.state]);

    const storedComponent = localStorage.getItem('activeSettingComponent') || 'Profile';
    const [activeComponent, setActiveComponent] = useState(storedComponent);
    const [hasNotification, setHasNotification] = useState(false);
    const location = useLocation();

    //set component based on navigation state or stored value
    useEffect(() => {
        if (location.state?.activeComponent) {
            setActiveComponent(location.state.activeComponent);
            localStorage.setItem('activeSettingComponent', location.state.activeComponent);
        }
    }, [location.state]);

    //update localStorage whenever activeComponent changes
    useEffect(() => {
        localStorage.setItem('activeSettingComponent', activeComponent);
    }, [activeComponent]);


    const renderComponent = () => {
        switch (activeComponent) {
        case 'Profile':
            return <ProfileComponent />;
        case 'Login & Security':
            return <LoginAndSecurityComponent />;
        case 'Manage Users':
            return <ManageUserComponent setHasNotification={setHasNotification} />;
        // case 'Preferences':
        //     return <PreferencesComponent />;
        case 'Help & Support':
            return <HelpAndSupportComponent />;
        case 'Terms & Conditions':
            return <TermAndConditionComponent />;
        case 'About':
            return <AboutComponent />;
        default:
            return <ProfileComponent />;
        }
    };
    
  return (
    <div className={styles.settingsPage}>
        <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Settings</h2>
            <ul className={styles.menuList}>
                <li
                    className={`${styles.menuItem} ${activeComponent === 'Profile' ? styles.active : ''}`}
                    onClick={() => setActiveComponent('Profile')}
                >
                    Profile
                </li>
                <li
                    className={`${styles.menuItem} ${activeComponent === 'Login & Security' ? styles.active : ''}`}
                    onClick={() => setActiveComponent('Login & Security')}
                >
                    Login & Security
                </li>
                <li
                    className={`${styles.menuItem} ${activeComponent === 'Manage Users' ? styles.active : ''}`}
                    onClick={() => setActiveComponent('Manage Users')}
                >
                    User&apos;s Approval
                    {hasNotification && <span className={styles.notificationDot}></span>}
                </li>
                {/* <li
                    className={`${styles.menuItem} ${activeComponent === 'Preferences' ? styles.active : ''}`}
                    onClick={() => setActiveComponent('Preferences')}
                >
                    Preferences
                </li> */}
                <li
                    className={`${styles.menuItem} ${activeComponent === 'Help & Support' ? styles.active : ''}`}
                    onClick={() => setActiveComponent('Help & Support')}
                >
                    Help & Support
                </li>
                <li
                    className={`${styles.menuItem} ${activeComponent === 'Terms & Conditions' ? styles.active : ''}`}
                    onClick={() => setActiveComponent('Terms & Conditions')}
                >
                    Terms & Conditions
                </li>
                <li
                    className={`${styles.menuItem} ${activeComponent === 'About' ? styles.active : ''}`}
                    onClick={() => setActiveComponent('About')}
                >
                    About
                </li>
            </ul>
        </aside>

        <div className={styles.componentContainer}>
            {renderComponent()}
        </div>
    </div>
  )
}

export default SettingPage
