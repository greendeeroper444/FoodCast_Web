import React, { useState } from 'react'
import styles from './PriceTrends.module.css'
import AllSuppliesComponent from '../../../PriceTrendsPage/components/AllSuppliesComponent';
import SelectCustomize from '../../../../molecules/SelectCustomize/SelectCustomize';

function PriceTrends() {
    const [activeComponent, setActiveComponent] = useState('VEGETABLE');

  return (
    <div className={styles.priceTrends}>
        <h2>Actual And Forecasted Demand</h2>
        <SelectCustomize
                value={activeComponent}
                onChange={setActiveComponent}
                options={['VEGETABLE', 'FRUIT']}
            />

        <div className={styles.componentContainer}>
            <AllSuppliesComponent activeType={activeComponent} />
        </div>
    </div>
  )
}

export default PriceTrends
