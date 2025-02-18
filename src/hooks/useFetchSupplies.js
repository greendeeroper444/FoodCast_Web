import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchVegetables } from '../redux/actions/AdminActions/AdminVegetableSupplyAction';
import { fetchFruits } from '../redux/actions/AdminActions/AdminFruitSupplyAction';

export default function useFetchSupplies() {
    const dispatch = useDispatch();
  
    const fruits = useSelector(state => state.fruitSupply.fruits || []);
    const vegetables = useSelector(state => state.vegetableSupply.vegetables || []);

    useEffect(() => {
        dispatch(fetchFruits());
        dispatch(fetchVegetables());
    }, [dispatch]);

//   return { fruits, vegetables };
    //sort fruits and vegetables by date in ascending order
    const sortedFruits = [...fruits].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedVegetables = [...vegetables].sort((a, b) => new Date(a.date) - new Date(b.date));

  return { 
    fruits: sortedFruits, 
    vegetables: sortedVegetables 
  }

}
