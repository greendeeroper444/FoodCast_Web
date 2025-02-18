import React from 'react'
import styles from './SupplyWastePage.module.css';
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
import SupplyIcon from '../../../assets/icons/drop-box-light.svg'

function SupplyWastePage() {
   
  return (
    <div className={styles.supplyWastePage}>
        <HeaderForm icon={SupplyIcon} title='WASTE SUPPLY' />

      
    </div>
  )
}


export default SupplyWastePage
