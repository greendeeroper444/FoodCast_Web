import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../actions/AdminActions/AdminAuthAction';

const LogoutSlice = createSlice({
    name: 'logout',
    initialState: {
        isModalOpen: false,
    },
    reducers: {
        openLogoutModal: (state) => {
            state.isModalOpen = true;
        },
        closeLogoutModal: (state) => {
            state.isModalOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.isModalOpen = false;
        });
    },
});

export const {openLogoutModal, closeLogoutModal} = LogoutSlice.actions;
export default LogoutSlice.reducer;
