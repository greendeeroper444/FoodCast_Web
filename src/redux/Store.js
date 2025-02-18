import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from './reducers/AdminReducers/AdminAuthReducer';
import sidebarReducer from './slices/SidebarSlice';
import modalReducer from './slices/SidebarSlice';
import logoutReducer from './slices/LogoutSlice';
import notificationReducer from './slices/NotificationSlice';
import collectedSupplyReducer from './reducers/CollectedSupplyReducer';
import adminCollectorsReducer from './reducers/AdminReducers/AdminCollectorReducer';

const Store = configureStore({
    reducer: {
        admin: adminAuthReducer,
        collected: collectedSupplyReducer,
        sidebar: sidebarReducer,
        modal: modalReducer,
        logout: logoutReducer,
        notification: notificationReducer,
        collectors: adminCollectorsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

export default Store
