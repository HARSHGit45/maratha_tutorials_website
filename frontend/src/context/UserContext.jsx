import {  createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { server } from "../main";
import toast, { Toaster } from 'react-hot-toast'

const UserContext = createContext()

export const UserContextProvider = ({children})=>{

  const [user,setuser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [loading, setloading] = useState(true)

 
  

  async function loginUser(email,password,navigate) {
    setBtnLoading(true);
    try{
      const {data} = await axios.post(`${server}/api/user/login`,
        {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setuser(data.user)
      setIsAuth(true)
      setBtnLoading(false)
      navigate("/")



    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setIsAuth(false);
    } finally {
      setBtnLoading(false); 
    }
  }


  async function fetchUser() {

    try{

      const { data } = await axios.get(`${server}/api/user/me`,
        {
          headers:{
            token : localStorage.getItem("token"),
          },
        });

        setIsAuth(true);
        setuser(data.user);
        setloading(false);

    }
    catch(error){
      console.log(error);
      setloading(false);
    }
    
  }


  useEffect(()=>{
    fetchUser()
  },[])



  return (
  <UserContext.Provider value={{user, setuser,setIsAuth,isAuth,loginUser,loading}} >
  {children}
  <Toaster/>
  
  </UserContext.Provider>)
}


export const UserData = () => useContext(UserContext);


