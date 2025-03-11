import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectedSupply, fetchCollectedSupplyDemand } from '../redux/actions/CollectedSupplyAction';
import { formatNumber } from '../utils/numberUtils';

export default function useFetchCollectedSupply(page = 1, supplyType = 'VEGETABLE') {
    const dispatch = useDispatch();
    
    const collectedSupplies = useSelector(state => state.collected?.collectedSupplies || []);
    const collectedSupplyDemands = useSelector(state => state.collected?.collectedSupplyDemands || []);

    const hasPreviousPage = useSelector(state => state.collected?.hasPreviousPage);
    const currentPage = useSelector(state => state.collected?.currentPage);
    const isLoading = useSelector(state => state.collected.loading);

    useEffect(() => {
        dispatch(fetchCollectedSupply(page, supplyType));
        dispatch(fetchCollectedSupplyDemand(page, supplyType));
    }, [dispatch, page, supplyType]);

    if (!Array.isArray(collectedSupplies)) return {collectedItems: [], collectedItemsDemand: []};
    if (!Array.isArray(collectedSupplyDemands)) return {collectedItems: [], collectedItemsDemand: []};

    const sortedSupplyCollected = [...collectedSupplies].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedSupplyCollectedDemand = [...collectedSupplyDemands].sort((a, b) => new Date(a.date) - new Date(b.date));

    //handle data processing based on the supplyType
    let collectedItems, collectedItemsDemand;
    
    if (supplyType === 'BOTH') {
        //for vegetables
        const vegetableItems = sortedSupplyCollected
            .filter(item => item.supplyType === 'VEGETABLE')
            .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
            .map(item => ({
                ...item,
                quantity: formatNumber(item.quantity),
            }));
            
        //for fruits
        const fruitItems = sortedSupplyCollected
            .filter(item => item.supplyType === 'FRUIT')
            .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
            .map(item => ({
                ...item,
                quantity: formatNumber(item.quantity),
            }));
            
        collectedItems = { vegetableItems, fruitItems };
        
        //demand data processing
        const vegetableItemsDemand = sortedSupplyCollectedDemand
            .filter(item => item.supplyType === 'VEGETABLE')
            .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
            .map(item => ({
                ...item,
                quantity: formatNumber(item.quantity),
            }));
            
        const fruitItemsDemand = sortedSupplyCollectedDemand
            .filter(item => item.supplyType === 'FRUIT')
            .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
            .map(item => ({
                ...item,
                quantity: formatNumber(item.quantity),
            }));
            
        collectedItemsDemand = {vegetableItemsDemand, fruitItemsDemand};
    } else {
        //original code for single type
        collectedItems = sortedSupplyCollected
            .filter(item => item.supplyType === supplyType)
            .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
            .map(item => ({
                ...item,
                quantity: formatNumber(item.quantity),
            }));

        collectedItemsDemand = sortedSupplyCollectedDemand
            .filter(item => item.supplyType === supplyType)
            .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
            .map(item => ({
                ...item,
                quantity: formatNumber(item.quantity),
            }));
    }

  return {
    collectedItems,
    collectedItemsDemand,
    hasPreviousPage,
    currentPage,
    isLoading
  }
}