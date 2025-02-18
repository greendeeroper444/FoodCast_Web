import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom';
import styles from'./NavLink.module.css';
import rightAngle from '../../../assets/icons/right-angle-light.svg';

//dashboard
import DashboardLight from '../../../assets/icons/dashboard-light.svg';
import HomeLight from '../../../assets/icons/home-light.svg';
import CalendarLight from '../../../assets/icons/calendar-light.svg'

//main menu
import SeasonalForecastLight from '../../../assets/icons/seasonal-forecast-light.svg';
import MapLight from '../../../assets/icons/map-light.svg';
import CollectedLight from '../../../assets/icons/collected-light.svg';
import PartnersManagementLight from '../../../assets/icons/partners-management-light.svg';
import SupplyLight from '../../../assets/icons/drop-box-light.svg';
import CropManagement from '../../../assets/icons/crops-management-light.svg';
import PriceTrend from '../../../assets/icons/price-trends-light.svg';

//settings
import SettingLight from '../../../assets/icons/setting-light.svg';

function NavLink({to, icon, label, className}) {
    const icons = {
        'fa-dashboard': DashboardLight,
        'fa-calendar': CalendarLight,
        'fa-home': HomeLight,
        'fa-seasonal-forecast': SeasonalForecastLight,
        'fa-map': MapLight,
        'fa-collected': CollectedLight,
        'fa-partners-management': PartnersManagementLight,
        'fa-supply': SupplyLight,
        'fa-setting': SettingLight,
        'fa-crop': CropManagement,
        'fa-trend': PriceTrend
    };

  return (
    <RouterNavLink to={to} className={({isActive}) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
        <div className={styles.navLinkContent}>
            <div className={styles.navLinkIconLabel}>
                <img src={icons[icon]} alt={label} className={styles.navIcon} />
                <span>{label}</span>
            </div>
            <img src={rightAngle} alt="Right Angle" className={styles.rightAngleIcon} />
        </div>
    </RouterNavLink>
  )
}

export default NavLink