import { createSlice } from '@reduxjs/toolkit';

const SidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isSidebarOpen: false,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        }
    }
});

export const {toggleSidebar} =  SidebarSlice.actions;
export default SidebarSlice.reducer;