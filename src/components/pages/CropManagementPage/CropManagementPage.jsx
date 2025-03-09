import React, { useEffect, useState } from 'react'
import styles from './CropManagementPage.module.css'
import HeaderForm from '../../molecules/HeaderForm/HeaderForm';
import CropIcon from '../../../assets/icons/crops-management-light.svg';
import SupplyListComponent from './components/SupplyListComponent';

function CropManagementPage() {
    // const [activeComponent, setActiveComponent] = useState('VEGETABLE');

    const storedCropType = localStorage.getItem('activeCropType') || 'VEGETABLE';
    const [activeComponent, setActiveComponent] = useState(storedCropType);

    useEffect(() => {
        localStorage.setItem('activeCropType', activeComponent);
    }, [activeComponent]);


  return (
    <div>
        <HeaderForm icon={CropIcon} title={`CROPS MANAGEMENT / ${activeComponent.includes('VEGETABLE') ? 'VEGETABLES' : 'FRUITS'}`} />
        <div className={styles.cropsManagementPage}>
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>Crops</h2>
                <ul className={styles.menuList}>
                    <li
                        className={`${styles.menuItem} ${activeComponent === 'VEGETABLE' ? styles.active : ''}`}
                        onClick={() => setActiveComponent('VEGETABLE')}
                    >
                        Vegetables
                    </li>
                    <li
                        className={`${styles.menuItem} ${activeComponent === 'FRUIT' ? styles.active : ''}`}
                        onClick={() => setActiveComponent('FRUIT')}
                    >
                        Fruits
                    </li>
                </ul>
            </aside>

            <div className={styles.componentContainer}>
                <SupplyListComponent activeType={activeComponent} />
            </div>
        </div>
    </div>
  )
}

export default CropManagementPage
