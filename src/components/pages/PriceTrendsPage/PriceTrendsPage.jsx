import React, { useState } from 'react'
import styles from './PriceTrendsPage.module.css'
import HeaderForm from '../../molecules/HeaderForm/HeaderForm';
import CropIcon from '../../../assets/icons/crops-management-light.svg';
import AllSuppliesComponent from './components/AllSuppliesComponent';

function PriceTrendsPage() {
    const [activeComponent, setActiveComponent] = useState('VEGETABLE');

  return (
    <div>
        <HeaderForm icon={CropIcon} title='CROPS MANAGEMENT' />
        <div className={styles.priceTrendsPage}>
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>PriceTrends</h2>
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
                <AllSuppliesComponent activeType={activeComponent} />
            </div>
        </div>
    </div>
  )
}

export default PriceTrendsPage
