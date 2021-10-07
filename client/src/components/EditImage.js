import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { updateImageAction } from '../store/asyncMethods/PostMethods';
import  toast, { Toaster } from 'react-hot-toast';
import { RESET_IMAGE_ERROR } from '../store/types/PostTypes';
 
 


const EditImage = () => {
    const [state, setstate] = useState({
        image: '',
        imagePreview: '',
        imageName: 'Choose Image'
    })
    //useParams
    const {id} = useParams();
    //useHistory
    const {push} = useHistory();
    //useDispatch
    const dispatch = useDispatch();
    //useSelector
    const {loading, redirect} = useSelector(state => state.PostReducer);
    const { updateImageErrors } = useSelector(state => state.UpdateImageReducer)

//file handle 
const fileHandle = (e) => {
    if(e.target.files.length !== 0){
         
    
    const reader = new FileReader();
    reader.onloadend = () => {
        setstate({...state, imagePreview: reader.result, image: e.target.files[0], imageName: e.target.files[0].name})
    };
    reader.readAsDataURL(e.target.files[0]);
}
     
}
//useEffect
useEffect(() => {
    if(updateImageErrors.length !== 0){
         updateImageErrors.map((err) => toast.error(err.msg));
          dispatch({type: RESET_IMAGE_ERROR});
    }
    if(redirect){
        push('/dashboard');
    }
//eslint-disable-next-line react-hooks/exhaustive-deps
}, [updateImageErrors, redirect])

//updateImage Onsubmit
const updateImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id)
    formData.append('image', state.image)
    dispatch(updateImageAction(formData))
}
    //return
    return (
        <div className="container mt-100">
        <Helmet>
                <title>Edit Image</title>
                <meta
                    name='description'
                    content='Edit Image Post'
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
        <div className="row">
            <div className="col-6">
                <div className="card">
                    <h3 className="card__h3">Update Post Image</h3>
                    <form onSubmit={updateImage}>
                         
                        <div className="group">
                            <label htmlFor="image" className="image__label">{state.imageName}</label>
                            <input 
                            type="file" 
                            name="image"
                            id="image" 
                            onChange={fileHandle}  
                            />
                        </div>
                        <div className="group">
                            <div className="imgPreview">
                                {state.imagePreview ? <img src={state.imagePreview} alt="currentImage"/> : ''}
                            </div>
                        </div>
                        <div className="group">
                            <input type="submit" value="Update Image"  className="btn btn-default btn-block" />
                        </div>
                      
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default EditImage
