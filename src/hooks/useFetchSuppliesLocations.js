import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFruitSupplyLocationSuccess } from '../redux/actions/AdminActions/AdminFruitSupplyAction';
import { fetchVegetableSupplyLocationSuccess } from '../redux/actions/AdminActions/AdminVegetableSupplyAction';

export default function useFetchSuppliesLocations() {
    const dispatch = useDispatch();

    const fruitLocations = useSelector(state => state.fruitSupply.fruitLocations);
    const vegetableLocations = useSelector(state => state.vegetableSupply.vegetableLocations);
    const error = useSelector(state => state.fruitSupply.error || state.vegetableSupply.error);

    useEffect(() => {
        dispatch(fetchFruitSupplyLocationSuccess());
        dispatch(fetchVegetableSupplyLocationSuccess());
    }, [dispatch]);

  return {
    fruitLocations,
    vegetableLocations,
    error,
  }
}
