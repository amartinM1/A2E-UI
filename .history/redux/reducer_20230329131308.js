import {set_user_name } from './action';

const initState = {
    name :'',
}

useReducer(state= initState, action){

    switch(action.type){

        case set_user_name:
                return {...state, name: action.payload};

         default:
            return state;
    }
}
export default useReducer;