import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
    name: 'modal',
    initialState: {
        isVegetableModalOpen: false,
        isFruitModalOpen: false,
    },
    reducers: {
        openVegetableModal: (state) => {
            state.isVegetableModalOpen = true;
        },
        closeVegetableModal: (state) => {
            state.isVegetableModalOpen = false;
        },
        openFruitModal: (state) => {
            state.isFruitModalOpen = true;
        },
        closeFruitModal: (state) => {
            state.isFruitModalOpen = false;
        },
    },
});

export const {
    openVegetableModal,
    closeVegetableModal,
    openFruitModal,
    closeFruitModal,
} = ModalSlice.actions;

export const selectIsVegetableModalOpen = (state) => state.modal.isVegetableModalOpen;
export const selectIsFruitModalOpen = (state) => state.modal.isFruitModalOpen;

export default ModalSlice.reducer;