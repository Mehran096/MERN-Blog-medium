import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import  toast, { Toaster } from 'react-hot-toast';
import { postLogin } from '../../store/asyncMethods/AuthMethods';
import Bgimage from './Bgimage';
import {Helmet} from 'react-helmet';

const Login = () => {
    const [state, setstate] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch();
    const {loginErrors,loading} = useSelector(state => state.AuthReducer)
    //handlechange
    const handleChange = (e) => {
        setstate({
            ...state,
        [e.target.name] : e.target.value
    });
    }
    //loginSubmit
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(postLogin(state));
        console.log(state)
    }
    useEffect(() => {
         if(loginErrors.length > 0){
             loginErrors.map((error) => toast.error(error.msg))
         }
    }, [loginErrors])
    return (
        <>
        <Helmet>
                <title>Login Form</title>
                <meta
                    name='description'
                    content='User Login Form'
                 />
        </Helmet>
        <div className="row mt-80">
            <div className="col-8">
                <Bgimage/>
                <Toaster 
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            fontSize: "14px"
                        }
                    }}
                />
            </div>
            <div className="col-4">
                <div className="account">
                    <div className="account-section">
                        <form onSubmit={loginSubmit}>
                            <div className="group">
                                <h3 className="form-heading">Login</h3>
                            </div>
                            
                            <div className="group">
                                <input 
                                type="email" 
                                name="email" 
                                value={state.email}
                                onChange={handleChange}
                                className="group__control" 
                                placeholder="Enter email" />
                            </div>
                            <div className="group">
                                <input 
                                type="password" 
                                name="password" 
                                value={state.password}
                                onChange={handleChange}
                                className="group__control" 
                                placeholder="Enter password" />
                            </div>
                            <div className="group">
                                <input 
                                type="submit" 
                                className="btn btn-default btn-block" 
                                value={loading ? '...' : 'Login'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login
