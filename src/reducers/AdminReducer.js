const init = {
    id : '', 
    admin_name : ''
}

export default (state = init, action) => {
    switch(action.type){
        case 'ADMIN_SUCCESS' : 
            const {id, admin_name} = action.payload
            return{
                ...state,
                id, admin_name
            }
        case 'ADMIN_LOGOUT' :
            return {
                id : '', 
                admin_name : ''
            }
        default :
        return state
    }
}