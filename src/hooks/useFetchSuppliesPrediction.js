import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFruitSupplyPrediction } from '../redux/actions/AdminActions/AdminFruitSupplyAction';
import { fetchVegetableSupplyPrediction } from '../redux/actions/AdminActions/AdminVegetableSupplyAction';

export default function useFetchSuppliesPrediction() {
    const dispatch = useDispatch();

    const fruitPrediction = useSelector(state => state.fruitSupply.fruitPrediction);
    const vegetablePrediction = useSelector(state => state.vegetableSupply.vegetablePrediction); 
    const error = useSelector(state => state.fruitSupply.error || state.vegetableSupply.error);

    useEffect(() => {
        dispatch(fetchFruitSupplyPrediction());
        dispatch(fetchVegetableSupplyPrediction());
    }, [dispatch]);

  return {
    fruitPrediction,
    vegetablePrediction,
    error,
  }
}
