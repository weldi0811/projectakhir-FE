const init = {
    products : []
}

export default ( state = init, action) => {
    switch(action.type){
        case 'GET_PRODUCT_BY_CATEGORY' :
            return {
                ...state,
                products : action.payload
            }
        case 'CLEAR_PRODUCT' :
            return {
                products : []
            }
        case 'GET_ALL_PRODUCT' :
            return{
                ...state,
                products : action.payload
            }
        default : 
        return state
    }
}