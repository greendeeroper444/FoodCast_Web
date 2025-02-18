import React from 'react'
import styles from './FruitSupplyModal.module.css'
import { useDispatch } from 'react-redux';
import ModalForm from '../ModalForm/ModalForm';
import { addFruitSupply, fetchFruits } from '../../../redux/actions/AdminActions/AdminFruitSupplyAction';

function FruitSupplyModal({onClose, onSubmit}) {
    const dispatch = useDispatch();

    const handleSubmit = async (formData) => {
        await dispatch(addFruitSupply(formData));
        dispatch(fetchFruits()); //re-fetch data after submission
        onSubmit();
    };

    const fields = [
        {label: 'Fruit Name:', name: 'fruitName', type: 'text'},
        {label: 'Quantity:', name: 'quantity', type: 'text'},
        {label: 'Price:', name: 'price', type: 'text'},
        {label: 'TimeDate:', name: 'timeDate', type: 'text'},
    ];

  return (
    <ModalForm
        title='Add Fruit Supply' 
        onClose={onClose} 
        onSubmit={handleSubmit}
        fields={fields} 
    />
  )
}

export default FruitSupplyModal
