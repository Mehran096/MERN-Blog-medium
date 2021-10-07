import axios from 'axios'
import { REDIRECT_FALSE, REDIRECT_TRUE, SET_MESSAGE} from '../types/PostTypes';
import { RESET_PROFILE_ERRORS, SET_PROFILE_ERRORS } from '../types/ProfileTypes';
import { CLOSE_LOADER, SET_LOADER, SET_TOKEN } from '../types/UserTypes';


//Update Name
export const userUpdateNAme = (updateName) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token}} = getState();
        dispatch({type: SET_LOADER})
        try {
            const config = {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.post( '/updateName', updateName, config )
            dispatch({type: CLOSE_LOADER})
           
             localStorage.setItem('myToken', data.token);
             dispatch({type:SET_TOKEN, payload: data.token})
             dispatch({type: SET_MESSAGE, payload: data.msg})
             dispatch({type:REDIRECT_TRUE})
             dispatch({type:REDIRECT_FALSE})
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            const {errors} = error.response.data;
            dispatch({type:SET_PROFILE_ERRORS, payload: errors})
            dispatch({type:RESET_PROFILE_ERRORS})
            // console.log(errors);
        }
    }
}

//Update Password
export const updatePasswordAction = (userData) => {
    return async (dispatch, getState) => {
        const {AuthReducer:{token}} = getState();
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        try {
            dispatch({type: SET_LOADER})
            const {data:{msg}} = await axios.post('/updatePassword', userData, config)
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_MESSAGE, payload: msg})
            dispatch({type: REDIRECT_TRUE})
            dispatch({type: REDIRECT_FALSE})
        } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_PROFILE_ERRORS, payload: errors})
            dispatch({type: RESET_PROFILE_ERRORS})
            console.log(errors);
        }
    }
}