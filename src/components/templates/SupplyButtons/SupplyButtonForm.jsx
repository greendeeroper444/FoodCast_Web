import React from 'react'
import styles from './SupplyButtonForm.module.css';
import SupplyButtonGroup from '../../molecules/SupplyButtonGroup/SupplyButtonGroup';
import SupplyButton from '../../molecules/SupplyButton/SupplyButton';
import SupplyButtonFormPropTypes from '../../../types/SupplyButtonFormPropTypes';
import downloadExcel from '../../../templates/downloadExcel';

function SupplyButtonForm({ 
    buttons, 
    activeTable, 
    setActiveTable, 
    filteredData, 
    supplyHeaders
}) {
    const {
        downloadReports
    } = downloadExcel(
        activeTable,
        filteredData,
        supplyHeaders,
    );

    
  return (
    <div className={styles.supplyButtonForm}>
        <SupplyButtonGroup 
            buttons={buttons} 
            activeTable={activeTable} 
            onClick={(type) => setActiveTable(type)} 
        />
        <div className={styles.actions}>
            {/* <SupplyButton onClick={handleAddSupply}label='Add Supply' /> */}
            <SupplyButton onClick={downloadReports}label='Download' />
        </div>
    </div>
  )
}


SupplyButtonForm.propTypes = SupplyButtonFormPropTypes;

export default SupplyButtonForm
