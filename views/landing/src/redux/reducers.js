import { combineReducers } from 'redux'

const user = (state = {}, action) => {
    switch(action.type){
        case 'UPDATE_TYPE':
            var user = {...state}
            user.user_type = action.value
            return user
        default:
            return state
    }
}



export default combineReducers({ user})