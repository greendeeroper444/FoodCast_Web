
import { createAction } from '@reduxjs/toolkit';
import api from '../../../api/api';

//define action types
export const SET_ADMIN = 'SET_ADMIN';
export const LOGOUT = 'LOGOUT';
export const SET_ERROR = 'SET_ERROR';
export const SET_TOKEN = 'SET_TOKEN';

//action creators
export const setAdmin = createAction(SET_ADMIN);
export const logout = createAction(LOGOUT);
export const setError = createAction(SET_ERROR);
export const setToken = createAction(SET_TOKEN);

//register admin action
export const registerAdmin = (adminData) => async (dispatch) => {
    try {
        const response = await api.post('/admin/register', adminData);
        const {admin} = response.data;
        dispatch(setAdmin(admin));
        //redirect or show success notification as needed
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to register admin'));
    }
};

//login admin action
export const loginAdmin = (fullName, password) => async (dispatch) => {
    try {
        const response = await api.post('/admin/login', { 
            fullName, 
            password 
        });
        const {admin} = response.data;
        dispatch(setAdmin(admin));

        //only navigate on successful login
        return {success: true, admin};
    } catch (error) {
        //set error message for login failure
        dispatch(setError(error.response?.data?.error || 'Failed to login admin'));
        return {success: false, error: error.response?.data?.error};
    }
};

//get/fetch admin data action
export const fetchAdminData = () => async (dispatch) => {
    try {
        const response = await api.get('/admin/getDataAdmin');
        dispatch(setAdmin(response.data));
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to fetch admin data'));
    }
};

// export const loadAdminFromStorage = () => (dispatch) => {
//     const storedAdmin = localStorage.getItem('admin');
//     const storedToken = localStorage.getItem('token');

//     if (storedAdmin && storedToken) {
//         dispatch(setAdmin(JSON.parse(storedAdmin)));
//         dispatch(setToken(storedToken));
//     }
// };


//logout action
export const logoutAdmin = () => async (dispatch) => {
    try {
        await api.post('/admin/logout', {});
        dispatch(logout());
        // window.location.href = '/';
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to log out'));
    }
};










//fetch admin data for update action
export const fetchAdminDataForUpdate = () => async (dispatch) => {
    try {
        const response = await api.get('/admin/getDataUpdateAdmin');
        dispatch(setAdmin(response.data));
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to fetch admin data'));
    }
};

//update admin profile action
export const updateAdminProfile = (formData) => async (dispatch) => {
    try {
        const response = await api.put('/admin/updateProfileAdmin', formData, {
            headers: { 
                'Content-Type': 'multipart/form-data' 
            }
        });
        dispatch(setAdmin(response.data));
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to update profile'));
    }
};

//change password action
export const changePasswordAdmin = (oldPassword, newPassword) => async (dispatch) => {
    try {
        await api.put('/admin/changePasswordAdmin', { 
            oldPassword, 
            newPassword 
        });

        dispatch(setError(null)); //clear any error if successful
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to change password'));
    }
};