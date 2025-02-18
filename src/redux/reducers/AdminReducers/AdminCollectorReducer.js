import { createReducer } from '@reduxjs/toolkit'
import { fetchCollectorDetailsFailure, fetchCollectorDetailsSuccess, fetchCollectorsFailure, fetchCollectorsSuccess } from '../../actions/AdminActions/AdminCollectorAction';

const initialState = {
    collectors: [],
    collectorDetails: null,
    error: null,
};

const adminCollectorsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchCollectorsSuccess, (state, action) => {
            state.collectors = action.payload;
            state.error = null;
        })
        .addCase(fetchCollectorsFailure, (state, action) => {
            state.error = action.payload;
        })
        .addCase(fetchCollectorDetailsSuccess, (state, action) => {
            state.collectorDetails = action.payload;
            state.error = null;
        })
        .addCase(fetchCollectorDetailsFailure, (state, action) => {
            state.error = action.payload;
        });
});

export default adminCollectorsReducer;
