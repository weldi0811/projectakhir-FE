const init = {
    id : '', 
    first_name : '', 
    last_name : '', 
    username : '', 
    email : '', 
    phone_number : '', 
    verified : '',
    thumbnail : '', 
    avatar :null,
    address : []
}


export default (state = init, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            const { id, first_name, last_name, username, email, phone_number, verified,thumbnail, avatar, address} = action.payload
            return {
                ...state,
                id, first_name, last_name, username, email, phone_number, verified, thumbnail, avatar, address
            }
        case 'LOGOUT_SUCCESS' :
            return {
                id : '', 
                first_name : '', 
                last_name : '', 
                username : '', 
                email : '', 
                phone_number : '', 
                verified : '',
                thumbnail : '', 
                avatar :null,
                address : []
            }
        case 'UPDATE_AVATAR': 
            return{
                ...state,
                avatar: action.payload
            }
        case 'DELETE_AVATAR' :
            return{
                ...state,
                avatar : null
            }
        case 'EDIT_PROFILE' :
            return{
                ...state,
                first_name : action.payload.newFName,
                last_name : action.payload.newLName,
                phone_number : action.payload.newPhoneNumber
            }
        case 'GET_ADDRESS' :
        case 'ADD_ADDRESS' :
        case 'DELETE_ADDRESS' :
            return {
                ...state,
                address : action.payload
            }
            default:
                return state
    }
}