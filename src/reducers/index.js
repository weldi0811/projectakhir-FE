import {combineReducers} from 'redux'

import AuthReducer from './AuthReducer'
import ProductReducer from './ProductReducer'
import AdminReducer from './AdminReducer'

export default combineReducers({
    auth: AuthReducer,
    product: ProductReducer,
    adminAuth : AdminReducer
})