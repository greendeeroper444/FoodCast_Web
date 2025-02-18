import { createReducer } from '@reduxjs/toolkit'
import { logout, setAdmin, setError } from '../../actions/AdminActions/AdminAuthAction';


const initialState = {
    admin: null,
    error: null,
};


const adminAuthReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setAdmin, (state, action) => {
            state.admin = action.payload;
            state.error = null; //clear any previous errors on successful login
        })
        .addCase(logout, (state) => {
            state.admin = null;
            state.error = null; //clear any previous errors on logout
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload;
        });
})

export default adminAuthReducer
