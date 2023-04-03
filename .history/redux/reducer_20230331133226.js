import {set_user_name, set_user_transcript } from './action';

const initState = {
    name :"test",
    transcript: "test log",
}

function userReducer(state= initState, action){
    switch(action.type) {
        case set_user_name:
                return {...state, name: action.payload};
        case set_user_transcript:
            return {...state, transcript: action.payload};
        default:
            return state;
    }
}


export default userReducer;