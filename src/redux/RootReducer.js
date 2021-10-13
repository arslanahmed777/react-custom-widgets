import { combineReducers } from "redux"
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import UserReducer from "./User"


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const RootReducer = combineReducers({
    user: UserReducer
})

export default persistReducer(persistConfig, RootReducer);