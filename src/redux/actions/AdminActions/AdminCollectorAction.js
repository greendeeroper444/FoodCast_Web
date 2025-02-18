import { createAction } from '@reduxjs/toolkit';
import api from '../../../api/api';
//define action types
export const FETCH_COLLECTORS_SUCCESS = 'FETCH_COLLECTORS_SUCCESS';
export const FETCH_COLLECTORS_FAILURE = 'FETCH_COLLECTORS_FAILURE';
export const FETCH_COLLECTOR_DETAILS_SUCCESS = 'FETCH_COLLECTOR_DETAILS_SUCCESS';
export const FETCH_COLLECTOR_DETAILS_FAILURE = 'FETCH_COLLECTOR_DETAILS_FAILURE';

//action creators
export const fetchCollectorsSuccess = createAction(FETCH_COLLECTORS_SUCCESS);
export const fetchCollectorsFailure = createAction(FETCH_COLLECTORS_FAILURE);
export const fetchCollectorDetailsSuccess = createAction(FETCH_COLLECTOR_DETAILS_SUCCESS);
export const fetchCollectorDetailsFailure = createAction(FETCH_COLLECTOR_DETAILS_FAILURE);


//fetch collectors
export const fetchCollectors = () => async (dispatch) => {
    try {
        const response = await api.get('/adminCollector/getCollectorsAdmin');
        dispatch(fetchCollectorsSuccess(response.data.collectors || [])); //ensure it's an array
    } catch (error) {
        dispatch(fetchCollectorsFailure(error.response?.data?.error || 'Failed to fetch collectors'));
    }
};

//fetch collector details
export const fetchCollectorDetails = (collectorId) => async (dispatch) => {
    try {
        const response = await api.get(`/adminCollector/getCollectorsDetailsAdmin/${collectorId}`);
        console.log('debugging', response.data)
        dispatch(fetchCollectorDetailsSuccess(response.data));
    } catch (error) {
        dispatch(fetchCollectorDetailsFailure(error.response?.data?.error || 'Failed to fetch collector details'));
    }
};
