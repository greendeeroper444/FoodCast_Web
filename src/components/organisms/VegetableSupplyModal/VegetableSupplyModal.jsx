import React from 'react'
import styles from './VegetableSupplyModal.module.css'
import { useDispatch } from 'react-redux';
import ModalForm from '../ModalForm/ModalForm';
import { addVegetableSupply, fetchVegetables } from '../../../redux/actions/AdminActions/AdminVegetableSupplyAction';

function VegetableSupplyModal({onClose, onSubmit}) {
    const dispatch = useDispatch();

    const handleSubmit = async (formData) => {
        await dispatch(addVegetableSupply(formData));
        dispatch(fetchVegetables()); //re-fetch data after submission
        onSubmit();
    };

    const fields = [
        {label: 'Vegetable Name:', name: 'vegetableName', type: 'text'},
        {label: 'Quantity:', name: 'quantity', type: 'text'},
        {label: 'Price:', name: 'price', type: 'text'},
        {label: 'TimeDate:', name: 'timeDate', type: 'text'},
    ];

  return (
    <ModalForm
        title='Add Vegetable Supply' 
        onClose={onClose} 
        onSubmit={handleSubmit}
        fields={fields} 
    />
  )
}

export default VegetableSupplyModal
