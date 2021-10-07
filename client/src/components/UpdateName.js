import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './Sidebar'
import {Helmet} from 'react-helmet'
import { userUpdateNAme } from '../store/asyncMethods/ProfileMethod'
import  toast, { Toaster } from 'react-hot-toast';
import {  useHistory } from 'react-router-dom';

const UpdateName = () => {
    //useState
    const [Name, setName] = useState('')
    //useHistory
    const {push} = useHistory()
    //useSelector
    const {redirect} = useSelector(state => state.PostReducer)
    const {updateErrors} = useSelector(state => state.ProfileNameUpdated)
    
    //useDispatch
    const dispatch = useDispatch();
    const { user: {name, _id} } = useSelector(state => state.AuthReducer);
    //useEffect
    useEffect(() => {
      setName(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(redirect){
            push('/dashboard')
        }
        if(updateErrors.length !== 0){
        updateErrors.map((err) => toast.error(err.msg));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateErrors, redirect])

    //submit user name
    const userNameUpdt = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('Name', name);
        dispatch(userUpdateNAme({name: Name, id: _id}))
    }
    return (
        <div className="container mt-100">
        <Helmet>
                <title>Update UserName</title>
                <meta
                    name='description'
                    content='User UpdateName'
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
        <div className="row mr-minus-15 ml-minus-15">
            <div className="col-3 p-15">
            <Sidebar/>      
            </div>
            <div className="col-9 p-15">
                <div className="card">
                    <h3 className="card__h3">Update Name</h3>
                    <form onSubmit={userNameUpdt}>
                        <div className="group">
                            <input 
                            type="text" 
                            name="" 
                            onChange={(e) => setName(e.target.value)} 
                            value={Name}
                            className="group__control"  
                            placeholder="Name..."
                            />
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

export default UpdateName
