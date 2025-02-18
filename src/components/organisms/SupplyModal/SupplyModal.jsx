import React from 'react'
import styles from './SupplyModal.module.css'
import ModalForm from '../ModalForm/ModalForm';
import PropTypes from 'prop-types';
import { addFruitSupply, fetchFruits } from '../../../redux/actions/AdminActions/AdminFruitSupplyAction';
import { addVegetableSupply, fetchVegetables } from '../../../redux/actions/AdminActions/AdminVegetableSupplyAction';
import { useDispatch } from 'react-redux';

function SupplyModal({ supplyType, onClose, onSubmit, fields }) {
    const dispatch = useDispatch();
    const title = `Add ${supplyType} Supply`;

    const handleSubmit = async (formData) => {

        //construct updatedFormData with locationDetails here
        const updatedFormData = {
            ...formData,
            city: formData.city.name,
            province: formData.city.province,
            latitude: formData.city.latitude,
            longitude: formData.city.longitude,
            address: formData.address || 'Default address',
        };


        if (supplyType === 'Fruit') {
            await dispatch(addFruitSupply(updatedFormData));
            dispatch(fetchFruits()); //re-fetch fruit data after submission
        } else if (supplyType === 'Vegetable') {
            await dispatch(addVegetableSupply(updatedFormData));
            dispatch(fetchVegetables()); //re-fetch vegetable data after submission
        } else if (supplyType === 'All') {
            //separate updatedFormData into fruit and vegetable data
            const fruitData = {
                fruitName: updatedFormData.fruitName,
                quantity: updatedFormData.quantity,
                price: updatedFormData.price,
                date: updatedFormData.date,
                locationDetails: updatedFormData.locationDetails,
            };
            const vegetableData = {
                vegetableName: updatedFormData.vegetableName,
                quantity: updatedFormData.quantity,
                price: updatedFormData.price,
                date: updatedFormData.date,
                locationDetails: updatedFormData.locationDetails,
            };
    
            //submit both fruit and vegetable supplies
            await dispatch(addFruitSupply(fruitData));
            await dispatch(addVegetableSupply(vegetableData));
    
            //re-fetch both fruit and vegetable data after submission
            dispatch(fetchFruits());
            dispatch(fetchVegetables());
        }
        onSubmit();
        onClose();
    };

  return (
    <ModalForm
        title={title}
        onClose={onClose}
        onSubmit={handleSubmit}
        fields={fields}
    />
  )
}

SupplyModal.propTypes = {
    supplyType: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
};

export default SupplyModal
