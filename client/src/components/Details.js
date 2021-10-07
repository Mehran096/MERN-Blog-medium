import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { detailsPost } from '../store/asyncMethods/PostMethods';
import {Helmet} from 'react-helmet';
import Loader from './Loader';
import moment from 'moment';
import { htmlToText } from 'html-to-text';
import { postComment } from '../store/asyncMethods/PostMethods';
import Comments from './Comments';
import { CLOSE_LOADER,  SET_LOADER, REMOVE_MESSAGE, SET_MESSAGE } from '../store/types/PostTypes';
import axios from 'axios';
import  toast, { Toaster } from 'react-hot-toast';
 


const Details = () => {
    const [comment, setComment] = useState('')
    //useParams
    const {id} = useParams();
     
    //useSelector
    const {loading, details, comments, message} = useSelector(state => state.PostReducer);
    const { user:  token  } = useSelector(state => state.AuthReducer);
    const { user } = useSelector(state => state.AuthReducer);
    //useDispatch
    const dispatch = useDispatch();
    //useEffect
    useEffect(() => {
        dispatch(detailsPost(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_MESSAGE});
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);
    //onsubmit
    const addComment = (e) => {
        e.preventDefault();
        dispatch(postComment({id: details._id, comment, userName: user.name}))
        setComment('')
        dispatch(detailsPost(id))
    }
    //deleteComment
    const deleteComment = async (idw) => {
        console.log(idw)
        const confirm = window.confirm('Are you really want to delete this Comment')
        if(confirm){
            dispatch({type: SET_LOADER})
            try {
               const config = {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data:{msg}} = await axios.get(`/deleter/${idw}`, config);
                console.log(msg)
                dispatch(detailsPost(id))
                dispatch({type:SET_MESSAGE, payload: msg})
                dispatch({type: CLOSE_LOADER})
            } catch (error) {
                dispatch({type: CLOSE_LOADER})
                console.log(error);
            }
        }
    }
    return (
        <div className="container">
         <Helmet>
                <title>Post Details</title>
                <meta
                    name='description'
                    content='Post user details'
                 />
            </Helmet>
            <Toaster 
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            fontSize: "14px"
                        }
                    }}
                />
            <div className="row mt-100">
                <div className="col-9"> 
                {!loading ? <div className="post__details"> 
                <div className="post__header">
                                            <div className="post__header__avator">
                                                {details.userName ? details.userName[0] : ''}
                                            </div>
                                            <div className="post__header__user">
                                                <span>{details.userName}</span>
                                                <span>{moment(details.updatedAt).format("MMM Do YY") }</span>
                                            </div>
                                        </div>
                                        <div className="post__body">
                                            <h1 className="post__body__title"> {details.title} </h1>
                                            <div className="post__body__details">{ htmlToText(details.body )}</div>
                                            <div className="post__body__image">
                                                <img src={`/images/${details.image}`} alt={details.image} />
                                            </div>
                                        </div>
                                        {user ? ( <> 
                                        <div className="post__comment">
                                            <form onSubmit={addComment}>
                                            <div className="group">
                                                <input 
                                                type="text" 
                                                className="group__control" 
                                                placeholder="Write a comment..."
                                                onChange={(e) => setComment(e.target.value)}  
                                                value={comment} 
                                                />
                                                </div>
                                                <div className="group">
                                                    <input type="submit" value="Post comment"  className="btn btn-default btn-block" />
                                                </div>
                                            </form>
                                        </div>
                                        <Comments comments={comments} deleteComment={deleteComment}/>
                                        </> )
                                         : ''}
                </div> : <Loader/> }
                </div>
            </div>
        </div>
    )
}

export default Details
