import { createReducer } from '@reduxjs/toolkit'
import { 
    fetchCollectedSupplyFailure, 
    fetchCollectedSupplySuccess,
    fetchCollectedSupplyDemandFailure, 
    fetchCollectedSupplyDemandSuccess, 
    fetchCollectedSupplyRequest,
    fetchCollectedSupplyDemandRequest
} from '../actions/CollectedSupplyAction';

const initialState = {
    collectedSupplies: [],
    collectedSupplyDemands: [],
    hasPreviousPage: false,
    currentPage: 1,
    loading: false,
    error: null
};

const collectedSupplyReducer = createReducer(initialState, (builder) => {
    builder
        // .addCase(fetchCollectedSupplySuccess, (state, action) => {
        //     state.collectedSupplies = Array.isArray(action.payload.collectedSupplies) ? action.payload.collectedSupplies : [];
        //     state.hasPreviousPage = action.payload.hasPreviousPage;
        //     state.currentPage = action.payload.currentPage;
        //     state.error = null;
        // })
        // .addCase(fetchCollectedSupplyFailure, (state, action) => {
        //     state.error = action.payload;
        // })
        .addCase(fetchCollectedSupplyRequest, (state) => {
            state.loading = true;
        })
        .addCase(fetchCollectedSupplySuccess, (state, action) => {
            state.collectedSupplies = Array.isArray(action.payload.collectedSupplies) ? action.payload.collectedSupplies : [];
            state.hasPreviousPage = action.payload.hasPreviousPage;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchCollectedSupplyFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false; 
        })
        // .addCase(fetchsSuccess, (state, action) => {
        //     state.collectedSuppliesDemand = Array.isArray(action.payload) ? action.payload : [];
        //     state.error = null;
        // })
        // .addCase(fetchCollectedSupplyDemandFailure, (state, action) => {
        //     state.error = action.payload;
        // })
        .addCase(fetchCollectedSupplyDemandRequest, (state) => {
            state.loading = true;
        })
        .addCase(fetchCollectedSupplyDemandSuccess, (state, action) => {
            state.collectedSupplyDemands = Array.isArray(action.payload.collectedSupplyDemands) ? action.payload.collectedSupplyDemands : [];
            state.hasPreviousPage = action.payload.hasPreviousPage;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchCollectedSupplyDemandFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false; 
        })
});

export default collectedSupplyReducer

