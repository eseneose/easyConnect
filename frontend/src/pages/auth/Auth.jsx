import React, {useState} from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction.js'

function Auth() {
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.authReducer.loading)
    const [isSignUp, setIsSignUp] = useState(false)
    const [data, setData] = useState({firstname:"", lastname:"", password:"", confirmpass:"", username:""})
    const [confirmPass, setConfirmPass] = useState(true)

    const handleChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
       e.preventDefault()

       if(isSignUp)
       {
        data.password === data.confirmpass? dispatch(signUp(data)): setConfirmPass(false)
       }else
       {
        dispatch(logIn(data))
       }
    }
    
    const resetForm=()=>{
        setConfirmPass(true);
        setData({
            firstname:"",
            lastname:"",
            password:"", 
            confirmpass:"", 
            username:""
        })
    }

  return (
    <div className="Auth">
{/*Left Side*/}
        <div className="a-left">
            <img src={Logo} className="Logo"alt=""/>
            <div className="webname">
                <h1>EasyCOnnect</h1>
                <h6>What's trending today</h6>
            </div>
        </div>
{/*Rigth Side*/}
        <div className="a-right">
            <form action="" className="infoForm authForm" onSubmit={handleSubmit}>


                <h3>{isSignUp? "Sign Up" : "Log In"}</h3>
               
                {isSignUp && 
                <div>
                        
                    <input 
                        type="text" 
                        placeholder="First Name"
                        className='infoInput' 
                        name='firstname' 
                        onChange={handleChange}
                        value={data.firstname}
                    />

                    <input 
                        type="text" 
                        placeholder="Last Name"
                        className='infoInput' 
                        name='lastname' 
                        onChange={handleChange}
                        value={data.lastname}
                    />
                </div>
                }
                   

                <div>
                  <input 
                      type="text" 
                      placeholder="Username"
                      className='infoInput' 
                      name='username'
                      onChange={handleChange} 
                      value={data.username}
                  />
                </div>
                   
                <div>
                    <input 
                        type="password" 
                        placeholder="password"
                        className='infoInput' 
                        name='password' 
                        onChange={handleChange}
                        value={data.password}
                    />
                    {isSignUp && 
                    <input 
                        type="password" 
                        placeholder="Confirm Password"
                        className='infoInput' 
                        name='confirmpass' 
                        onChange={handleChange}
                        value={data.confirmpass}
                    />
                    }
                </div>

                <span 
                    style={{
                        fontSize: '12px', 
                        color: "red", 
                        display: confirmPass? "none": "block", 
                        alignSelf:"flex-end", 
                        marginRight:"5px"}} 
                >
                    * Passwords don't match
                </span>

                <div>
                    <span 
                        style={{fontSize: '12px', cursor:"pointer"}} 
                        onClick={()=>{setIsSignUp((prev)=>!prev); resetForm()}}
                    >
                        {isSignUp ?"Already have an account? Login!": 
                        "Don't have an account? Sign Up!"}
                    </span>
                </div>

                <button 
                    className="button infoButton" 
                    type="submit"
                    disabled={loading}
                >
                    {loading? "Loading...":isSignUp? "Sign Up" : "Log In"}
                </button>
            </form>
        </div>
    </div>
  )
}
export default  Auth