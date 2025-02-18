import React from 'react'
import styles from './SupplyButtonForm.module.css';
import SupplyButtonGroup from '../../molecules/SupplyButtonGroup/SupplyButtonGroup';
import SupplyButton from '../../molecules/SupplyButton/SupplyButton';
import SupplyButtonFormPropTypes from '../../../types/SupplyButtonFormPropTypes';
import useCollectedButtonHandlers from '../../../hooks/useCollectedButtonHandlers';

function SupplyButtonForm({ 
    buttons, 
    activeTable, 
    setActiveTable, 
    filteredData, 
    supplyHeaders
}) {
    const {
        downloadReports
    } = useCollectedButtonHandlers(
        activeTable,
        filteredData,
        supplyHeaders,
    );

    const fruitFieldsCollected = [
        {label: 'Fruit Name:', name: 'fruitName', type: 'text'},
        {label: 'Quantity:', name: 'quantity', type: 'text'},
        {label: 'Price:', name: 'price', type: 'text'},
        {label: 'date:', name: 'date', type: 'text'},
        {label: 'City:', name: 'city', type: 'autocomplete'},
    ];
    
    const vegetableFieldsCollected = [
        {label: 'Vegetable Name:', name: 'vegetableName', type: 'text'},
        {label: 'Quantity:', name: 'quantity', type: 'text'},
        {label: 'Price:', name: 'price', type: 'text'},
        {label: 'date:', name: 'date', type: 'text'},
        {label: 'City:', name: 'city', type: 'autocomplete'},
    ];
    
    //when supplyType is 'All', concatenate fruitFieldsCollected and vegetableFieldsCollected
    // const supplyFields = {
    //     Fruit: fruitFieldsCollected,
    //     Vegetable: vegetableFieldsCollected,
    //     All: [...fruitFieldsCollected, ...vegetableFieldsCollected], //concatenate both fruit and vegetable fields
    // };
    //when supplyType is 'All', concatenate fruitFieldsCollected and vegetableFieldsCollected
    const supplyFields = {
        FruitCollected: fruitFieldsCollected,
        VegetableCollected: vegetableFieldsCollected,
        All: [
            { section: 'Fruit Supply' }, //label for fruit section
            ...fruitFieldsCollected, 
            { section: 'Vegetable Supply' }, //label for vegetable section
            ...vegetableFieldsCollected
        ], //concatenate both fruit and vegetable fields withlabels
    };
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
        {/* {
            isModalOpen && (
                <SupplyModal
                    supplyType={supplyType}
                    fields={supplyFields[supplyType]}
                    onClose={() => closeModal()}
                    onSubmit={handleAddSupply}
                />
            )
        } */}
    </div>
  )
}


SupplyButtonForm.propTypes = SupplyButtonFormPropTypes;

export default SupplyButtonForm
