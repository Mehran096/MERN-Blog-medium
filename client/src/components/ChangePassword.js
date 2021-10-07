import React, {useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import  toast, { Toaster } from 'react-hot-toast';
import { updatePasswordAction } from '../store/asyncMethods/ProfileMethod';
import Loader from './Loader';

const ChangePassword = () => {
    //useState
    const [state, setstate] = useState({
        current: '',
        newPassword: '',
        userId: null
    })
    //useHistory
    const {push} = useHistory()
    //useSelector
    const {loading, redirect} = useSelector(state => state.PostReducer);
    const {updateErrors} = useSelector(state => state.ProfileNameUpdated)
    const {user:{_id}} = useSelector(state => state.AuthReducer)
     
    //useDispatch
    const dispatch = useDispatch();
    //useEffect
    useEffect(() => {
        if(redirect){
            push('/dashboard')
        }
        if(updateErrors.length !== 0){
            updateErrors.map((err) => toast.error(err.msg));
            }
        
    }, [updateErrors, redirect])
    //onSubmit
    const updatePassword = (e) => {
        e.preventDefault();
        dispatch(updatePasswordAction({current: state.current, newPassword: state.newPassword, userId: _id}))
        
    }
    

    //return
    return (
        !loading ? <div className="container mt-100">
        <Helmet>
                <title>Edit Password</title>
                <meta
                    name='description'
                    content='Edit User Password'
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
        <div className="row mr-minus-15 ml-minus-15">
            <div className="col-3 p-15">
                <Sidebar/>
            </div>
            <div className="col-9 p-15">
                <div className="card">
                <h3 className="card__h3">Change Password</h3>
                    <form onSubmit={updatePassword}>
                        <div className="group">
                            <input 
                            type="password" 
                            name="" 
                            onChange={(e) => setstate({...state, current: e.target.value})} 
                            value={state.current}
                            className="group__control"  
                            placeholder="Current Password..."
                            />
                        </div>
                        <div className="group">
                            <input 
                            type="password" 
                            name="" 
                            onChange={(e) => setstate({...state, newPassword:e.target.value})} 
                            value={state.newPassword}
                            className="group__control"  
                            placeholder="New Password..."
                            />
                        </div>
                        <div className="group">
                            <input type="submit" value="Update Password"  className="btn btn-default btn-block" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
            
        </div> : <Loader/>
    )
}

export default ChangePassword;
