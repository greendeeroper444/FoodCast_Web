import { combineReducers } from 'redux';
import adminFruitSupplyReducer from './AdminReducers/AdminFruitSupplyReducer';
import adminVegetableSupplyReducer from './AdminReducers/AdminVegetableSupplyReducer';

const rootReducer = combineReducers({
    adminFruitSupply: adminFruitSupplyReducer,
    adminVegetableSupply: adminVegetableSupplyReducer,
})

export default rootReducer
