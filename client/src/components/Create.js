import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createAction } from '../store/asyncMethods/PostMethods';
import  toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader';

const Create = (props) => {
    const [currentImage, setCurrentImage] = useState('Choose Image');
    const [imagePreview, setImagePreview] = useState('');
    const [slug, setSlug] = useState('');
    const [slugButton, setSlugButton] = useState(false);
    //useDispatch
    const dispatch = useDispatch()
    //useSelector
    const {user: {_id, name}} = useSelector(state => state.AuthReducer);
    const {createErrors, redirect, loading} = useSelector(state => state.PostReducer)
    //state
    const [state, setSate] = useState({
        title: '',
        description: '',
        image: ''
    })
   //handlechange for title
   const handleChange = (e) => {
       setSate({
           ...state,
           [e.target.name]: e.target.value
       });
       const createSlug = e.target.value.trim().split(' ').join('-');
       setSlug(createSlug);
   }
   //slug Handle
   const slugHandle = (e) => {
       setSlug(e.target.value);
       setSlugButton(true);
   }
   //handleClick
   const handleClick = (e) => {
       e.preventDefault();
       setSlug(slug.trim().split(' ').join('-'));
   }
   //handleDescription
   const handleDescription = (e) => {
        setSate({
            ...state,
            [e.target.name]: e.target.value
        })
   }
   //imaghandle
    const fileHandle = (e) => {
       if(e.target.files.length !== 0){
        setCurrentImage(e.target.files[0].name);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setSate({
            ...state,
            [e.target.name]: e.target.files[0]
        })
    }
    }
    const [value, setValue] = useState('');
    //useEffect
    useEffect(() => {
        if(redirect){
            props.history.push('/dashboard')
        }
        if(createErrors.length !== 0){
        createErrors.map((err) => toast.error(err.msg));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createErrors, redirect])
    //formSubmit
    const createPost = (e) => {
        e.preventDefault();
        const {title, description, image} = state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', value);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('slug', slug);
        formData.append('name', name);
        formData.append('id', _id);
        dispatch(createAction(formData))
         
    }
    return (
        <div className="create mt-100">
        <Helmet>
                <title>Create Post</title>
                <meta
                    name='description'
                    content='User Create Post'
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
       { !loading ? <div className="container">
        <form onSubmit={createPost}>
            <div className="row mr-minus-15 ml-minus-15 ">
                <div className="col-6 p-15">
                    <div className="card">
                        <h3 className="card__h3">Create a new Post</h3>
                    
                        <div className="group">
                            <label htmlFor="title">Post Title</label>
                            <input 
                            type="text" 
                            name="title"
                            value={state.title}
                            id="title" 
                            onChange={handleChange}
                            className="group__control" 
                            placeholder="Post title..."

                            />
                        </div>
                        <div className="group">
                            <label htmlFor="image" className="image__label">{currentImage}</label>
                            <input 
                            type="file" 
                            name="image"
                            id="image" 
                            onChange={fileHandle}
                            
                                
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
                            onChange={handleDescription}
                            className="group__control"
                            placeholder="meta description..."
                            maxLength="150"
                            ></textarea>
                            <p className="length">{state.description ? state.description.length : 0}</p>
                        </div>
                        
                      
                    </div>
                </div>
                <div className="col-6 p-15">
                    <div className="card">
                        <div className="group">
                            <label htmlFor="slug">Post URL</label>
                            <input 
                            type="text" 
                            name="slug"
                            value={slug}
                            onChange={slugHandle}
                            id="slug"
                            className="group__control"
                            placeholder="Post URL..."

                            />
                        </div>
                        <div className="group">
                            {slugButton ? ( <button className="btn btn-default" onClick={handleClick}>Update Slug</button>) : ''}
                        </div>
                        <div className="group">
                            <div className="imgPreview">
                                {imagePreview ? (<img src={imagePreview} alt="currentImage"/>) : ''}
                            </div>
                        </div>
                        
                        <div className="group">
                            <input type="submit" value="Create Post"  className="btn btn-default btn-block" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </div> : <Loader/>}
            
        </div> 
    )
}

export default Create
