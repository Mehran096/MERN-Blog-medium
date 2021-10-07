import React, {useState, useEffect} from 'react';
import Bgimage from './Bgimage';
import  toast, { Toaster } from 'react-hot-toast';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import { postRegister } from '../../store/asyncMethods/AuthMethods';


const Register = (props) => {
    const [state, setstate] = useState({
        name: '',
        email: '',
        password: ''
    })
    const dispatch = useDispatch();
    const {loading, registerErrors} = useSelector((state) => state.AuthReducer)

    //handle inputs
    const handleInputs = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    //user onsubmit
    const userRegister =  async (e) => {
        e.preventDefault();
         dispatch(postRegister(state))
         
        
    }

    useEffect(() => {
         if(registerErrors.length > 0){
            registerErrors.map(error => (
            toast.error(error.msg)
            ))
         }

        //  if(user){
        //      props.history.push('/dashboard');
        //  }
    }, [registerErrors])

    //return
    return (
        <>
         <Helmet>
                <title>Registration Form</title>
                <meta
                    name='description'
                    content='User Registration Form'
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
                        <form onSubmit={userRegister}>
                            <div className="group">
                                <h3 className="form-heading">Register</h3>
                            </div>
                            <div className="group">
                                <input 
                                type="text" 
                                name= 'name'
                                className="group__control" 
                                placeholder="Enter name" 
                                value={state.name}
                                onChange= {handleInputs}

                                />
                            </div>
                            <div className="group">
                                <input 
                                type="email" 
                                name= 'email' 
                                className="group__control" 
                                placeholder="Enter email" 
                                value= {state.email}
                                onChange= {handleInputs}
                                />
                                
                            </div>
                            <div className="group">
                                <input 
                                type="password" 
                                name= 'password' 
                                className="group__control" 
                                placeholder="Enter password" 
                                value= {state.password}
                                onChange= {handleInputs}
                                />
                            </div>
                            <div className="group">
                                <input 
                                type="submit" 
                                className="btn btn-default btn-block" 
                                value= {loading ? '...' : 'Register'} 

                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register
