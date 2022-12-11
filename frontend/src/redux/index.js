import { combineReducers } from "redux"
import auth from './reducers/auth'
import product from './reducers/product'

const rootReducer = combineReducers({
    auth,
    product
});

export default rootReducer;