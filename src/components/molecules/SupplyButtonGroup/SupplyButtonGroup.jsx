import React from 'react'
import styles from './SupplyButtonGroup.module.css';
import SupplyButton from '../../molecules/SupplyButton/SupplyButton';


function SupplyButtonGroup({buttons, activeTable, onClick}) {
  return (
    <div className={styles.supplyButtonGroup}>
        {
            buttons.map((button) => (
                <SupplyButton
                key={button.label}
                label={button.label}
                onClick={() => onClick(button.label)}
                isActive={activeTable === button.label}
                />
            ))
        }
    </div>
  )
}

export default SupplyButtonGroup
