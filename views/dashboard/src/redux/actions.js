
// export const addCar = (car) => {
//     return {
//         type: 'ADD_CAR',
//         value: car
//     }
// }
export const updateUser = (payload) =>{
    return{
        type:"UPDATE_USER",
        value:payload
    }
}

export const ig = (payload)=>{
    return{
        type:"UPDATE",
        value:payload
    }
}

export const campaigns =(payload)=>{
    return{
        type:"UPDATE",
        value:payload
    }
}
// export const removeCar = (index) => {
//     return {
//         type: 'REMOVE_CAR',
//         value: index
//     }
// }

// export const fetchMakes = () => {
//     return (dispatch) => {
//         fetch(url)
//             .then(res => res.json())
//             .then(response => {
//                 const action = {
//                     type: 'FETCH_MAKES',
//                     value: response.Results
//                 }
//                 dispatch(action)
//             })
//     }
// }
// export const deleteMake = (index)=>{
//     return{
//         type:"DELETE_MAKE",
//         value:index
//     }
// }