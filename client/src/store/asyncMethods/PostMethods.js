import axios from "axios";
 
 
 
import { 
    CREATE_ERRORS, 
    SET_LOADER, 
    CLOSE_LOADER, 
    REDIRECT_FALSE, 
    REMOVE_MESSAGE,  
    REDIRECT_TRUE, 
    SET_MESSAGE,   
    REMOVE_ERRORS ,
    SET_POSTS,
    SET_POST,
    POST_REQUEST,
    SET_UPDATE_ERRORS,
    UPDATE_IMAGE_ERROR,
    SET_DETAILS,
    COMMENTS,
} from "../types/PostTypes";
// const token = localStorage.getItem('myToken');
 
export const createAction = (postState) => {
    return async (dispatch, getState) => {
        const  {AuthReducer: {token}} = getState();
         dispatch({type: SET_LOADER})
             try {
                 const config = {
                     headers: {
                         Authorization: `Bearer ${token}`
                     }
                 }
                 const { data: {msg} } = await axios.post('/create_post', postState, config)
                 console.log(msg);
                 dispatch({type: CLOSE_LOADER});
                dispatch({type: REDIRECT_TRUE});
                dispatch({type: REMOVE_ERRORS})
                dispatch({type: SET_MESSAGE, payload: msg});
                dispatch({type: REMOVE_MESSAGE})
                dispatch({type: REDIRECT_FALSE});
                
             } catch (error) {
                 console.log(error.response)
                 const {errors} = error.response.data;
                 dispatch({type: CLOSE_LOADER})
                 dispatch({type: CREATE_ERRORS, payload: errors})
                  
             }
        
    }
}

//get action
export const fetchPosts = (id, page) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token} } = getState();
        dispatch({type: SET_LOADER});
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
          const {data: {response, count, perPage} } = await axios.get(`/posts/${id}/${page}`, config)
          dispatch({type: CLOSE_LOADER});
         dispatch({type: SET_POSTS, payload: {response, count, perPage}})
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
        }
    }
}

//get single post

export const fetchPost = (id) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token}} = getState();
        dispatch({type: SET_LOADER});
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const {data: {post} } = await axios.get(`/post/${id}`, config);
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_POST, payload: post});
            dispatch({type: POST_REQUEST})
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
        }
    }
}

//update action
export const updateAction = (editData) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token}} = getState();
        dispatch({type: SET_LOADER});
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axios.post('/update', editData, config );
            console.log(data)
            dispatch({type: CLOSE_LOADER});
            dispatch({type: REDIRECT_TRUE});
            dispatch({type: SET_MESSAGE, payload: data.msg})
            dispatch({type: REDIRECT_FALSE})
        } catch (error) {
            const {response: {data:{errors}}} = error;
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_UPDATE_ERRORS, payload: errors});
            console.log(error.response)
            
        }
    }
}

//update image action
export const updateImageAction = (EditImage) => {
    return async (dispatch, getState) => {
        const {AuthReducer:{token}} = getState()
        dispatch({type: SET_LOADER})
        try {
            
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        const {data: {msg}} = await axios.post('/updateImage', EditImage, config)
        dispatch({type: CLOSE_LOADER})
        dispatch({type: REDIRECT_TRUE})
        dispatch({type: SET_MESSAGE, payload: msg})
        dispatch({type: REDIRECT_FALSE})
        console.log(msg)
        } catch (error) {
            const {response:{data:{errors}}} = error;
            
            dispatch({type: UPDATE_IMAGE_ERROR, payload: errors} )
            dispatch({type: CLOSE_LOADER})
             
            
        }
    }
}

//post show on home 
export const homePost = (page) => {
	return async (dispatch) => {
		dispatch({ type: SET_LOADER });
		try {
			const {
				data: { response, count, perPage },
			} = await axios.get(`/home/${page}`);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: SET_POSTS, payload: { response, count, perPage } });
		} catch (error) {
			dispatch({ type: CLOSE_LOADER });
			console.log(error);
		}
	};
};

//post home details
export const detailsPost = (id) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER});
        try {
            const {data:{post, comments}} = await axios.get(`/explore/${id}`)
            dispatch({type: CLOSE_LOADER})
             console.log(comments)
            dispatch({type: SET_DETAILS, payload: post})
            dispatch({type: COMMENTS, payload: comments})
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            console.log(error);
        }
    }
}

//post comment action
export const postComment = (commentData) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }    
        }
        try {
            dispatch({type: SET_LOADER})
            const {data:{msg}} = await axios.post('/comment', commentData, config)
             
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_MESSAGE, payload: msg})
             
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            console.log(error)
        }
    }
}
 
