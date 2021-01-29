import { combineReducers } from 'redux'

const user = (state = {},action) => {
    switch(action.type){
        case "UPDATE_USER":
            console.log(action.value);
            let x = state;
            x.type=action.value;    
            console.log(x);
            return x;
        default:
            return state
    }
}

const ig = (state ={},action)=>{
    switch(action.type){
        case "UPDATE":
            let x = action.value;
            return x;
        default:
            return state
    }
}

const campaigns = (state=[],action)=>{
    switch(action.type){
        case "UPDATE":
            let x = action.value;
            return x;
        default:
            return state
    }
}
// const cars = (state = [], action) => {
//     switch(action.type) {
//         case 'ADD_CAR':
//             return [ ...state, action.value ]
//         case 'REMOVE_CAR':
//             const cars = [ ...state ]
//             cars.splice(action.value, 1)
//             return cars
//         default:
//             return state
//     }
// }

// const makes = (state = [], action) => {
//     switch(action.type) {
//         case 'DELETE_MAKE':
//             console.log(action)
//             const makes = [ ...state ]
//             makes.splice(action.value, 1)
//             return makes
//         case "FETCH_MAKES":
//             return action.value
//         default:
//             return state
//     }
// }

export default combineReducers({user,ig,campaigns})