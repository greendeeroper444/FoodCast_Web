import { createSelector } from 'reselect';

const selectAdminState = (state) => state.AdminAuthReducer || {};

export const selectAdminInfo = createSelector(
    [selectAdminState],
    (adminState) => adminState.adminInfo || {}
);
