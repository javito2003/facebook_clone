const dataInicial = {
    user: {}
}

// TYPES
const GET_USER_LOCAL = "GET_USER_LOCAL"
const ERROR_GET_USER_LOCAL = "ERROR_GET_USER_LOCAL"




export default function userReducer(state = dataInicial, action){
    switch (action.type){
        case GET_USER_LOCAL:
            return {...state, user: action.payload}
        case ERROR_GET_USER_LOCAL:
            return {...state, user: action.payload}
        default: 
            return state
    }
}


export const getUserLocal = () => async(dispatch, getState) => {
    try {
        if(localStorage.getItem('auth')){
            dispatch({
                type: GET_USER_LOCAL,
                payload: JSON.parse(localStorage.getItem('auth'))
            })
            return
        }else{
            dispatch({
                type: ERROR_GET_USER_LOCAL,
                payload: null
            })
        }
    } catch (error) {
        console.log(error);
    }
}