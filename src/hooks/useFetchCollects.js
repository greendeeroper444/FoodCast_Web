import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFruitsCollected } from '../redux/actions/AdminActions/AdminFruitCollectedAction';
import { fetchVegetablesCollected } from '../redux/actions/AdminActions/AdminVegetableCollectedAction';

export default function useFetchCollects() {
    const dispatch = useDispatch();
  
    const fruitsCollected = useSelector(state => state.fruitCollected.fruitsCollected || []);
    const vegetablesCollected = useSelector(state => state.vegetableCollected.vegetablesCollected || []);

    useEffect(() => {
        dispatch(fetchFruitsCollected());
        dispatch(fetchVegetablesCollected());
    }, [dispatch]);

//   return { fruits, vegetables };
    //sort fruits and vegetables by date in ascending order
    const sortedFruitsCollected = [...fruitsCollected].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedVegetablesCollected = [...vegetablesCollected].sort((a, b) => new Date(a.date) - new Date(b.date));

  return { 
    fruitsCollected: sortedFruitsCollected, 
    vegetablesCollected: sortedVegetablesCollected 
  }

}
