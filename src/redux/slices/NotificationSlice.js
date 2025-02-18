import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        toggleNotificationBar: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeNotificationBar: (state) => {
            state.isOpen = false;
        },
        openNotificationBar: (state) => {
            state.isOpen = true;
        },
    },
});

export const { toggleNotificationBar, closeNotificationBar, openNotificationBar } = notificationSlice.actions;

export default notificationSlice.reducer;