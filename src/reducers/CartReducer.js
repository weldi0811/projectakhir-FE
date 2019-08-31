const init = {
    cart : []
}

export default (state = init, action) => {
    switch(action.type) {
        case 'GET_CART' :
            return{
                cart : action.payload
            }

        case 'LOGOUT_SUCCESS' :
            return {
                cart : []
            }

        default:
            return state
    }
}