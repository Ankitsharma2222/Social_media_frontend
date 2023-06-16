import './App.css';
import React, { useContext } from "react"
import NavBar from './components/NavBar';
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import { useReducer ,useEffect } from 'react'; 
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/SignIn';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import CreatePost from './components/CreatePost';
import {Intialstate, reducer, userReducer} from "./reducers/userReducer"

export const UserContext=createContext()

const Routing=()=>{
  const {state,dispatch}=useContext(UserContext)
  const navigate=useNavigate()
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(!user){
      navigate("/signin")
    }
    else{
      dispatch({type:"USER" , payload:user})
      // navigate("/")
    }
  },[])
  return (
        <Routes>
          <Route path='/'  element={<><Home/></>} />
          <Route path='/signup'  element={<><SignUp/></>} />
          <Route path='/signin'  element={<><Login/></>} />
          <Route path='/profile'  element={<><Profile/></>} />
          <Route path='/createpost'  element={<><CreatePost/></>} />


        </Routes>
    
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer ,Intialstate)
  return (
    <UserContext.Provider value={{state,dispatch}} >
      <BrowserRouter>
          <div>
            <NavBar/>
          </div>
            <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
