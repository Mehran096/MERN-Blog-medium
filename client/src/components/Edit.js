import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import { useParams, useHistory } from 'react-router'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useSelector, useDispatch} from "react-redux";
 import { fetchPost, updateAction } from '../store/asyncMethods/PostMethods';
import { POST_RESET, RESET_UPDATE_ERRORS } from '../store/types/PostTypes';
import  toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader';




const Edit = () => {
    //params
    const { id } = useParams();
    //reactquill
    const [value, setValue] = useState('');
    //state
    const [state, setSate] = useState({
        title: '',
        description: ''
        
    })
    //useSelector
    const {loading, redirect} = useSelector(state => state.PostReducer);
    const  {post, postRequest} = useSelector(state => state.FetchReducer);
    const {editErrors} = useSelector(state => state.UpdatePostReducer);
    //use dispatch
   const dispatch = useDispatch();
   //useHistory
   const {push} = useHistory();
   //useEffect
   useEffect(() => {
       if(postRequest){
           setSate({
               title: post.title,
               description: post.description
           })
           setValue(post.body);
           dispatch({type: POST_RESET})
       }else{
        dispatch(fetchPost(id))
       }
       
        
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [post])
   //useEffect for update errors
   useEffect(() => {
       if(editErrors.length !== 0){
            editErrors.map((err) => toast.error(err.msg));
            dispatch({type: RESET_UPDATE_ERRORS})
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [editErrors])
   //useEffect for redirect
   useEffect(() => {
       if(redirect){
           push('/dashboard');
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [redirect])
   //submit for update
   const updatePost = (e) => {
       e.preventDefault();
        dispatch(updateAction({
          title: state.title,
          body: value,
          description: state.description,
          id: post._id,
       }))
   }
    return (
        !loading ? <div className="mt-100">
        <Helmet>
                <title>User Edit</title>
                <meta
                    name='description'
                    content='User Edit'
                 />
        </Helmet>
        <Toaster 
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            fontSize: "14px"
                        }
                    }}
                />
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                    <h3 className="card__h3">Edit Post</h3>
                    <form onSubmit={updatePost}>
                        <div className="group">
                            <label htmlFor="title">Post Title</label>
                            <input 
                            type="text" 
                            name="title"
                            value={state.title} 
                            onChange={(e) => setSate({...state, title: e.target.value})}
                            id="title" 
                            className="group__control" 
                            placeholder="Post title"
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="body">
                            Post body
                            </label>
                            <ReactQuill theme="snow" id="body" placeholder="Post Body..." value={value} onChange={setValue}/>
                           
                        </div>
                        <div className="group">
                            <label htmlFor="description">Meta Description</label>
                            <textarea 
                            name="description" 
                            id="description" 
                            cols="30" 
                            rows="10" 
                            defaultValue={state.description}
                            onChange={(e) => setSate({...state, description: e.target.value})}
                            onKeyUp={(e) => setSate({...state, description: e.target.value})}
                            className="group__control"
                            placeholder="meta description..."
                            maxLength="150"
                            ></textarea>
                            <p className="length">{state.description ? state.description.length : 0}</p>
                        </div>
                        <div className="group">
                            <input type="submit" value="Edit"  className="btn btn-default btn-block" />
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
         </div> : <Loader/>
    )
}

export default Edit
