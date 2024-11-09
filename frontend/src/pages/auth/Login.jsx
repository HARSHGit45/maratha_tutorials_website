import React, { useState } from 'react'
import './auth.css'
import {Link, useNavigate} from 'react-router-dom'
import { UserData } from '../../context/UserContext'

const Login = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const{btnloading,loginUser} = UserData();


  const submitHandler = async(e)=>{
    e.preventDefault()
    await loginUser(email,password,navigate);

  }




  return (
   <div className='auth-page'>
   <div className='auth-form'>
   <h2>LOGIN</h2>
   <form onSubmit={submitHandler}>
   <label htmlFor='email'>Email</label>
   <input type='email'
   
   value={email}
   onChange={(e)=> setemail(e.target.value)}

    required  />

   <label htmlFor='password'>Password</label>
   <input type='password' 
   
   value={password}
   onChange={(e)=> setpassword(e.target.value)}
   
   required  />

   <button disabled={btnloading} type='submit' className='common-btn'>
   {btnloading?"please Wait...":"Login"}
   </button>
   </form>

   <p>
    Dont have an account ? <Link to='/register'>Register</Link>
   </p>

   </div>

   </div>
  )
}

export default Login
