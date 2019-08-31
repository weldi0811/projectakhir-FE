import axios from '../config/axios'
import cookies from 'universal-cookie'
import { async } from 'q';
import { truncate } from 'fs';

const cookie = new cookies()

export const onLoginUser = (inputEmail,inputPassword) => {
    return async(dispatch) => {
        var getUser = await axios.post('/users/login', {
            email : inputEmail,
            password: inputPassword
        })

        try{
            //kalau email atau password ga bener, getUser balikin string error
            if(typeof(getUser.data) === 'string' ){
                console.log(getUser.data)

            }
            else{
                const { id, first_name, last_name, username, email, phone_number, verified, avatar} = getUser.data

                //set cookie
                cookie.set('ithinkUser', { id, first_name, last_name, username, email, phone_number, verified, avatar })
                
                //kirim data user ke dispatch
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload : { 
                        id, first_name, last_name, username, email, phone_number, verified, avatar
                    }
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

//KEEPLOGIN
export const keepLogin = (objectUser) => {
    const {id, first_name, last_name, username, email, phone_number, verified, avatar} = objectUser

    return{
        type:'LOGIN_SUCCESS',
        payload : { 
            id, first_name, last_name, username, email, phone_number, verified, avatar
        }
    }
}

//LOGOUT
export const onLogout = () => {
    cookie.remove('ithinkUser')

    return{
        type: 'LOGOUT_SUCCESS'
    }

}

//UPDATE AVATAR
export const updateAvatar = (formData,objectUser) => {
    return async (dispatch) => {
        //form data = {}
        const result = await await axios.patch('/users/avatar',formData)

        cookie.remove('ithinkUser')

        const {id,first_name,last_name,username,phone_number, avatar} = objectUser

        cookie.set('ithinkUser', {id,first_name,last_name,username,phone_number, avatar : result.data.filename})

        dispatch({
            type: 'UPDATE_AVATAR',
            payload: result.data.filename
        })
    }
}

//EDIT PROFILE
export const editProfile = (newFName,newLName,newPhoneNumber, objectUser) => {

    const {id,first_name,last_name,username,email,phone_number,avatar} = objectUser

    return async(dispatch) => {
        const res = await axios.patch(`/users/profile/${objectUser.username}`, {
            first_name : newFName,
            last_name : newLName,
            phone_number : newPhoneNumber
        })
    cookie.remove('ithinkUser')

    cookie.set('ithinkUser', {
        id,
        first_name : newFName,
        last_name : newLName,
        phone_number : newPhoneNumber,
        email,
        username,
        avatar
    })

    dispatch({
        type: 'EDIT_PROFILE',
        payload : {
            newFName,
            newLName,
            newPhoneNumber
        }
    })
    }
}

//DELETE AVATAR
export const deleteAvatar = (objectUser) => {
    return async dispatch => {
        const {id,first_name,last_name,username,email,phone_number,avatar} = objectUser

        const res = await await axios.delete(`/users/avatar/${id}`)

        cookie.remove('ithinkUser')

        cookie.set('ithinkUser', {id,first_name,last_name,username,email,phone_number,avatar: null} )

        dispatch({
            type: 'DELETE_AVATAR'
        })

    }
}



////////////////////////////////////////////////////
//BUAT PRODUCT
////////////////////////////////////////////////////

//NARIK PRODUCT by category
export const getProductByCategory = (category_id) => {

    return async(dispatch) =>{
        try{
            
            const result = await axios.get(`/products/${category_id}`)

            console.log(result.data)

            dispatch({
                type: 'GET_PRODUCT_BY_CATEGORY',
                payload : result.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

//NARIK PRODUCT
export const getAllProduct = () => {
    return async(dispatch) => {
        try{
            const result = await axios.get(`/allproduct`)

            dispatch({
                type: 'GET_ALL_PRODUCT',
                payload : result.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}
//CLEAR STATE PRODUCT
export const clearProduct = () => {
    return {
        type : 'CLEAR_PRODUCT'
    }
}

//DELETE PRODUK BY ID

export const updateStatusProduct = (productID) => {
    return async() => {
        try {
            const res = await axios.patch(`/statusproduct/${productID}`)
        } catch (error) {
            console.error(error)
            
        }
    }


}

//EDIT PRODUK
export const editProduct = (productID, product_name, price, description) => {
    return async () => {
        try {
            const res = await axios.patch(`/product/${productID}`,{
                product_name,price,description
            })
            return res.data
        } catch (error) {
            console.error(error)
            
        }
    }
}


//ADD PRODUCT BY CATEGORY
export const addKaos = (formData) => {
    return async () => {
        try {
            const res = await axios.post('/product/1', formData)

        }
        catch (err){
            console.error(err)
        }
    }
}

export const addKemeja = (formData) => {
    return async () => {
        try{
            const res = await axios.post('/product/2', formData)
        }
        catch (err) {
            console.error(err)
        }
    }
}






//////////////////////////////////////////////////////////////////
////// BUAT ADMIN //////////////////////////////////////////////

export const onLoginAdmin = (inputName,inputPassword) => {

    return async(dispatch) => {
        var getAdmin = await axios.post('/admin/login', {
            admin_name : inputName,
            admin_pass : inputPassword
        })

        try{
            //kalau email atau password ga bener, getUser balikin string error
            if(typeof(getAdmin.data) === 'string' ){
                console.log(getAdmin.data)

            }
            else{
                const {id, admin_name} = getAdmin.data
                
                //kirim data user ke dispatch
                dispatch({
                    type:'ADMIN_SUCCESS',
                    payload : { 
                        id, admin_name
                    }
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const onLogoutAdmin = () => {
    return{
        type : 'ADMIN_LOGOUT'
    }
}



////////////////////////////////////////////////////////
///////////////////   CART
////////////////////////////////////////////////////////

//narik cart user

export const getCart = (objectUser) => {

    return async dispatch => {
        const res = await axios.get(`/cart/${objectUser.id}`) //bentuknya [{}]
 
        dispatch({
            type: 'GET_CART',
            payload: res.data
        })
    }
    
}

//add cart

//size S
export const addToCartS = (prod_id, user_id, qty_S) => {

    return async() => {
        const res = await axios.post(`/addtocarts`, {
            product_id : prod_id,
            user_id : user_id,
            qty_S : qty_S
        })

        return res.data
    }
}

//SIZE M
export const addToCartM = (prod_id, user_id, qty_M) => {

    return async() => {
        const res = await axios.post(`/addtocartm`, {
            product_id : prod_id,
            user_id : user_id,
            qty_M : qty_M
        })

        return res.data
    }
}

//SIZE L
export const addToCartL = (prod_id, user_id, qty_L) => {

    return async() => {
        const res = await axios.post(`/addtocartl`, {
            product_id : prod_id,
            user_id : user_id,
            qty_L : qty_L
        })

        return res.data
    }
}

//SIZE XL
export const addToCartXL = (prod_id, user_id, qty_XL) => {

    return async() => {
        const res = await axios.post(`/addtocartxl`, {
            product_id : prod_id,
            user_id : user_id,
            qty_XL : qty_XL
        })

        return res.data
    }
}

//update cart qty
//SIZE S
export const updateQTYS = (prod_id, user_id, qty_S) => {

    return async () => {
        const res = await axios.patch(`/updateqtys`, {
            product_id : prod_id,
            user_id : user_id,
            qty_S : qty_S
        })

        return res.data
    }
}

//SIZE M
export const updateQTYM = (prod_id, user_id, qty_M) => {

    return async () => {
        const res = await axios.patch(`/updateqtym`, {
            product_id : prod_id,
            user_id : user_id,
            qty_M : qty_M
        })

        return res.data
    }
}

//SIZE L
export const updateQTYL = (prod_id, user_id, qty_L) => {

    return async () => {
        const res = await axios.patch(`/updateqtyl`, {
            product_id : prod_id,
            user_id : user_id,
            qty_L : qty_L
        })

        return res.data
    }
}

//SIZE XL
export const updateQTYXL = (prod_id, user_id, qty_XL) => {

    return async () => {
        const res = await axios.patch(`/updateqtyxl`, {
            product_id : prod_id,
            user_id : user_id,
            qty_XL : qty_XL
        })

        return res.data
    }
}

// GANTI QUANTITY
//SIZE S
export const changeQtyS = (id,qty_S) => {
    return async() => {
        const res = await axios.patch(`/changeqtys/${id}`,
        {
            qty_S : qty_S
        })
        return res.data
    }
}

//SIZE M
export const changeQtyM = (id,qty_M) => {
    return async() => {
        const res = await axios.patch(`/changeqtym/${id}`,
        {
            qty_M : qty_M
        })
        return res.data
    }
}

//SIZE L
export const changeQtyL = (id,qty_L) => {
    return async() => {
        const res = await axios.patch(`/changeqtyl/${id}`,
        {
            qty_L : qty_L
        })
        return res.data
    }
}

//SIZE XL
export const changeQtyXL = (id,qty_XL) => {
    return async() => {
        const res = await axios.patch(`/changeqtyxl/${id}`,
        {
            qty_XL : qty_XL
        })
        return res.data
    }
}

//delete cart
//delete cart user, jadi nembaknya ke userid

export const deleteUserCart = (id) => {
    return async () => {
        try {
            const res = await axios.delete(`/deletecart/${id}`)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }
}

//delete item didalem cart
//id yang dipake itu id cart di database, jd liat urutan itemnya

export const deleteItemCart = (id) => {
    return async() => {
        try {
            const res = await axios.delete(`/deletecartitem/${id}`)
        } catch (error) {
            console.error(error)
            
        }
    }
}

/////////////////////////////////
////////////// CHECKOUT ////////
//////////////////////////////////


//post checkout

export const postCheckout = ( user_id, total_price, order_name, order_address, order_phonenumber, cartArray) => {

    return async () => {
        try {
            const res = await axios.post('/checkout', {
                user_id, total_price, order_name, order_address, order_phonenumber, cartArray
            })
            console.log(res.data)

            return res.data
        } catch (error) {
            console.error(error)
        }
    }
}

//narik transaksi by id

export const getUserTransaction = (user_id) => {
    return async () => {
        try {
            const res = await axios.get(`/usertransaction/${user_id}`)

            return res.data
        } catch (error) {
            console.error(error)
            
        }
    }
}

export const getItemsTransaction = (checkout_id) => {
    return async() => {
        try {
            const res = await axios.get(`/usertransaction/items/${checkout_id}`)
            return res.data
        } catch (error) {
            console.error(error)
            
        }
    }
}

//upload payment proof

export const uploadProof = (formData) => {
    return async () => {
        try{
            const res = await axios.patch('/confirmation', formData)
            console.log(res.data)

        } catch (error) {
            console.error(error)
        }
    }
}


////////////////////////////// ADMIN /////////////////////////////////////

export const getAllTransaction = () => { 
    return async () => {
        try {
            const res = await axios.get('/alltransactions')
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
}

export const getAdminTransaction = (checkout_id) => {
    return async() => {
        try {
            const res = await axios.get(`/transactions/${checkout_id}`)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
}


export const addResi = (id,resi) => {
    return async () => {
        try {
            const res = await axios.patch(`/updateresi/${id}`, 
            {order_awb : resi})

            return res.data
        } catch (error) {
            console.error(error)
        }
    }
}

export const finishTranscation = (id) => {
    return async () => {
        try {
            const res = await axios.patch(`/checkoutcomplete/${id}`)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
}

export const rejectTransaction = (id, proof_of_payment) => {
    return async() => {
        try {
            const res = await axios.patch (`/checkoutrejected/${id}`, {proof_of_payment})

        } catch (error) {
            
        }
    }
}



