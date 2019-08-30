const init = {
    id : '', 
    first_name : '', 
    last_name : '', 
    username : '', 
    email : '', 
    phone_number : '', 
    verified : '',
    thumbnail : '', 
    avatar :null
}


export default (state = init, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            const { id, first_name, last_name, username, email, phone_number, verified,thumbnail, avatar} = action.payload
            return {
                ...state,
                id, first_name, last_name, username, email, phone_number, verified, thumbnail, avatar
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
                avatar :null
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
            default:
                return state
    }
}