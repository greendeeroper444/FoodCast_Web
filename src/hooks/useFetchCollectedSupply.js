// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCollectedSupply, fetchCollectedSupplyDemand } from '../redux/actions/CollectedSupplyAction';
// import { formatNumber } from '../utils/numberUtils';


// export default function useFetchCollectedSupply() {
//     const dispatch = useDispatch();

//     const collectedSupplies = useSelector(state => state.collectedSupplies.collectedSupplies || []);
//     const collectedSuppliesDemand = useSelector(state => state.collectedSupplies.collectedSuppliesDemand || []);

//     useEffect(() => {
//         dispatch(fetchCollectedSupply());
//         dispatch(fetchCollectedSupplyDemand());
//     }, [dispatch]);

//     const sortedSupplyCollected = [...collectedSupplies].sort((a, b) => new Date(a.date) - new Date(b.date));
//     const sortedSupplyCollectedDemand = [...collectedSuppliesDemand].sort((a, b) => new Date(a.date) - new Date(b.date));

//     //filter and sort collected fruits and vegetables alphabetically
//     const collectedFruits = sortedSupplyCollected
//         .filter(item => item.supplyType === 'FRUIT')
//         .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
//         .map(item => ({
//             ...item,
//             quantity: formatNumber(item.quantity),
//         }));

//     const collectedVegetables = sortedSupplyCollected
//         .filter(item => item.supplyType === 'VEGETABLE')
//         .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
//         .map(item => ({
//             ...item,
//             quantity: formatNumber(item.quantity),
//         }));

//     const collectedFruitsDemand = sortedSupplyCollectedDemand
//         .filter(item => item.supplyType === 'FRUIT')
//         .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
//         .map(item => ({
//             ...item,
//             quantity: formatNumber(item.quantity),
//         }));

//     const collectedVegetablesDemand = sortedSupplyCollectedDemand
//         .filter(item => item.supplyType === 'VEGETABLE')
//         .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
//         .map(item => ({
//             ...item,
//             quantity: formatNumber(item.quantity),
//         }));

//   return {
//     collectedFruits,
//     collectedVegetables,
//     collectedFruitsDemand,
//     collectedVegetablesDemand,
//   }
// }


// // import React, { useEffect } from 'react'
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchCollectedSupply, fetchCollectedSupplyDemand } from '../redux/actions/CollectedSupplyAction';


// // export default function useFetchCollectedSupply() {
// //     const dispatch = useDispatch();
  
// //     const collectedSupplies = useSelector(state => state.collectedSupplies.collectedSupplies || []);
// //     const collectedSuppliesDemand = useSelector(state => state.collectedSupplies.collectedSuppliesDemand || []);

// //     useEffect(() => {
// //         dispatch(fetchCollectedSupply());
// //         dispatch(fetchCollectedSupplyDemand());
// //     }, [dispatch]);

// //     const sortedSupplyCollected = [...collectedSupplies].sort((a, b) => new Date(a.date) - new Date(b.date));
// //     const sortedSupplyCollectedDemand = [...collectedSuppliesDemand].sort((a, b) => new Date(a.date) - new Date(b.date));

// //     const collectedFruits = sortedSupplyCollected.filter(item => item.supplyType === 'FRUIT') || [];
// //     const collectedVegetables = sortedSupplyCollected.filter(item => item.supplyType === 'VEGETABLE') || [];
// //     const collectedFruitsDemand = sortedSupplyCollectedDemand.filter(item => item.supplyType === 'FRUIT') || [];
// //     const collectedVegetablesDemand = sortedSupplyCollectedDemand.filter(item => item.supplyType === 'VEGETABLE') || [];
 
// //   return { 
// //     collectedFruits, 
// //     collectedVegetables,
// //     collectedFruitsDemand, 
// //     collectedVegetablesDemand
// //   }

// // }
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
        dispatch(fetchCollectedSupply(page, supplyType)); //fetch data based on the current page
        dispatch(fetchCollectedSupplyDemand(page, supplyType));
    }, [dispatch, page, supplyType]); //depend on page

    if (!Array.isArray(collectedSupplies)) return {collectedFruits: [], collectedVegetables: []};
    if (!Array.isArray(collectedSupplyDemands)) return {collectedFruitsDemand: [], collectedVegetablesDemand: []};

    const sortedSupplyCollected = [...collectedSupplies].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedSupplyCollectedDemand = [...collectedSupplyDemands].sort((a, b) => new Date(a.date) - new Date(b.date));

    const collectedItems = sortedSupplyCollected
    .filter(item => item.supplyType === supplyType)
    .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
    .map(item => ({
        ...item,
        quantity: formatNumber(item.quantity),
    }));

    const collectedItemsDemand = sortedSupplyCollectedDemand
    .filter(item => item.supplyType === supplyType)
    .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
    .map(item => ({
        ...item,
        quantity: formatNumber(item.quantity),
    }));
    

  return {
    collectedItems,
    collectedItemsDemand,
    hasPreviousPage,
    currentPage,
    isLoading
  }
}
