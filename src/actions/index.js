import axios from '../config/axios'
import cookies from 'universal-cookie'
import { async } from 'q';

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
        const result = await axios.post('/users/avatar',formData)

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

        const res = await axios.delete('/users/avatar', {username})

        cookie.remove('ithinkUser')

        cookie.set('ithinkUser', {id,first_name,last_name,username,email,phone_number,avatar: ''} )

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
            const result = await axios.get(`/product`)

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

//NARIK PRODUCT SEMUA






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




