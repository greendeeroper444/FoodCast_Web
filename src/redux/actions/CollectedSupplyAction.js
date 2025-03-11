import { createAction } from '@reduxjs/toolkit';
import api from '../../api/api';

//define action types
export const FETCH_COLLECTED_SUPPLIES_REQUEST = 'FETCH_COLLECTED_SUPPLIES_REQUEST';
export const FETCH_COLLECTED_SUPPLIES_SUCCESS = 'FETCH_COLLECTED_SUPPLIES_SUCCESS';
export const FETCH_COLLECTED_SUPPLIES_FAILURE = 'FETCH_SUPPLIES_FAILURE';
export const FETCH_COLLECTED_SUPPLIES_DEMAND_REQUEST = 'FETCH_COLLECTED_SUPPLIES_DEMAND_REQUEST';
export const FETCH_COLLECTED_SUPPLIES_DEMAND_SUCCESS = 'FETCH_COLLECTED_SUPPLIES_DEMAND_SUCCESS';
export const FETCH_COLLECTED_SUPPLIES_DEMAND_FAILURE = 'FETCH_SUPPLIES_DEMAND_FAILURE';

//action creators
export const fetchCollectedSupplyRequest = createAction(FETCH_COLLECTED_SUPPLIES_REQUEST);
export const fetchCollectedSupplySuccess = createAction(FETCH_COLLECTED_SUPPLIES_SUCCESS);
export const fetchCollectedSupplyFailure = createAction(FETCH_COLLECTED_SUPPLIES_FAILURE);
export const fetchCollectedSupplyDemandRequest = createAction(FETCH_COLLECTED_SUPPLIES_DEMAND_REQUEST);
export const fetchCollectedSupplyDemandSuccess = createAction(FETCH_COLLECTED_SUPPLIES_DEMAND_SUCCESS);
export const fetchCollectedSupplyDemandFailure = createAction(FETCH_COLLECTED_SUPPLIES_DEMAND_FAILURE);


//fetch collected supply
// export const fetchCollectedSupply = () => async (dispatch) => {
//     try {
//         const response = await api.get('/api/collectedSupply/getCollectedSupply');
//         dispatch(fetchCollectedSupplySuccess(response.data.collectedSupplies || [])); //ensure it's an array
//     } catch (error) {
//         dispatch(fetchCollectedSupplyFailure(error.response?.data?.error || 'Failed to fetch collected supplies'));
//     }
// };
export const fetchCollectedSupply = (page = 1, supplyType = 'VEGETABLE') => async (dispatch) => {
    dispatch(fetchCollectedSupplyRequest());
    try {
        const response = await api.get(`/api/collectedSupply/getCollectedSupply?page=${page}&supplyType=${supplyType}`);
        const {collectedSupplies, hasPreviousPage} = response.data;

        setTimeout(() => {
            dispatch(fetchCollectedSupplySuccess({
                collectedSupplies: collectedSupplies || [],
                hasPreviousPage,
                currentPage: page
            }));
        }, 1000); //1second
    } catch (error) {
        setTimeout(() => {
            dispatch(fetchCollectedSupplyFailure(error.response?.data?.error || 'Failed to fetch collected supplies'));
        }, 5000);
    }
};

// export const fetchCollectedSupplyDemand = () => async (dispatch) => {
//     try {
//         const response = await api.get('/api/collectedSupply/getCollectedSupplyDemand');
//         dispatch(fetchCollectedSupplyDemandSuccess(response.data.collectedSuppliesDemand || [])); //ensure it's an array
//     } catch (error) {
//         dispatch(fetchCollectedSupplyDemandFailure(error.response?.data?.error || 'Failed to fetch collected supplies'));
//     }
// };
export const fetchCollectedSupplyDemand = (page = 1, supplyType = 'VEGETABLE') => async (dispatch) => {
    dispatch(fetchCollectedSupplyRequest());
    try {
        const response = await api.get(`/api/collectedSupply/getCollectedSupplyDemand?page=${page}&supplyType=${supplyType}`);
        const {collectedSupplyDemands, hasPreviousPage} = response.data;

        setTimeout(() => {
            dispatch(fetchCollectedSupplyDemandSuccess({
                collectedSupplyDemands: collectedSupplyDemands || [],
                hasPreviousPage,
                currentPage: page
            }));
        }, 1000); //1second
    } catch (error) {
        setTimeout(() => {
            dispatch(fetchCollectedSupplyDemandFailure(error.response?.data?.error || 'Failed to fetch collected supplies'));
        }, 5000);
    }
};
