export const set_user_name = "set_user_name";
//export const current_transcript = "test log";

export const setUser = name => dispatch => {

    dispatch({
        type: set_user_name,
        payload: name,
    });
};