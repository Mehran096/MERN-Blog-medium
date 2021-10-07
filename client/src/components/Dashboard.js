import React, {useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {useSelector,  useDispatch} from 'react-redux'
import  toast, { Toaster } from 'react-hot-toast';
import {Link, useParams} from 'react-router-dom';
import {fetchPosts} from '../store/asyncMethods/PostMethods';
import { BsPencil } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";
import Loader from './Loader';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
import { CLOSE_LOADER, REMOVE_MESSAGE, SET_LOADER, SET_MESSAGE } from '../store/types/PostTypes';
import axios from 'axios';
import moment from 'moment'
 
 

 

const Dashboard = () => {
    const {message, loading} = useSelector(state => state.PostReducer);
    const { user: {_id}, token } = useSelector(state => state.AuthReducer);
    const { posts, count, perPage } = useSelector(state => state.FetchReducers);
    //pagination
    let {page} = useParams();
    if(page === undefined){
        page = 1
  }
    const dispatch = useDispatch();
     
     
    
    useEffect(() => {
        
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_MESSAGE});
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);
    //deletePost
    const deletePost = async (id) => {
        const confirm = window.confirm('Are you really want to delete this post')
        if(confirm){
            dispatch({type: SET_LOADER})
            try {
               const config = {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data:{msg}} = await axios.get(`/delete/${id}`,  config);
                dispatch(fetchPosts(_id, page));
                dispatch({type:SET_MESSAGE, payload: msg})
                dispatch({type: CLOSE_LOADER})
            } catch (error) {
                dispatch({type: CLOSE_LOADER})
                console.log(error);
            }
        }
    }
    //useEfffect for refreshing the data
    useEffect(() => {
        dispatch(fetchPosts(_id, page));
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    //return
    return (
        <>
        <Helmet>
                <title>User Dashboard</title>
                <meta
                    name='description'
                    content='User Dashboard'
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
        <div className="container mt-100">
             <div className="row  mr-minus-15 ml-minus-15">
                 <div className="col-3 p-15">
                     <Sidebar/>
                 </div>
                 <div className="col-9 p-15">
                     {!loading ? posts.length > 0 ? posts.map(post => (
                         <div className="dasboard__posts" key={posts._id}>
                            <div className="dasboard__posts__title">
                                <Link to={`/details/${post.slug}`}>{post.title}</Link>
                                <span>Published {moment(post.updatedAt).fromNow()}</span>
                            </div>
                            <div className="dasboard__posts__links">
                            <Link  to={`/editImage/${post._id}`}><BsFillImageFill className="icon" /></Link>
                            <Link to={`/edit/${post._id}`}>
                            <BsPencil className="icon" />
                            </Link>
                             <BsTrashFill onClick={() => deletePost(post._id)} className="icon" /> 
                             </div>
                         </div>
                     )) : 'You dont have any posts' : <Loader/>}
                     <Pagination path='dashboard' page={page} perPage={perPage} count={count}/>
                 </div>
             </div>
        </div>
        </>
    )
}

export default Dashboard
