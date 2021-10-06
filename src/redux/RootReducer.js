import { combineReducers } from "redux"

import UserReducer from "./User"


const RootReducer = combineReducers({
    user: UserReducer
})

export default RootReducer