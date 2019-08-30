import {combineReducers} from 'redux'

import AuthReducer from './AuthReducer'
import ProductReducer from './ProductReducer'
import AdminReducer from './AdminReducer'
import CartReducer from './CartReducer'

export default combineReducers({
    auth: AuthReducer,
    product: ProductReducer,
    adminAuth : AdminReducer,
    cart : CartReducer
})