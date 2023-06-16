import React from "react"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../App";

function Signin(){
    const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate();
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const handlesubmit=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                password,
                email
            })

        })
        .then((res)=>res.json())                            
        .then((data)=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                dispatch({type:"USER",payload:data.user})
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                M.toast({html:"Sign in Successfully",classes:"#43a047 green darken-1"})
                navigate('/')
            }
        })
        .catch((err)=>{
            console.log("Error in signin file" ,err);
        })

    }     
    return (
        <>
            <div className="mycard " >
                <div className="card auth-card input-field">
                    <h2 className="brand-logo">Chatgram</h2>
                    <input type="text" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                    <input type="password" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
                    <button className="btn waves-effect waves-light #4a148c purple darken-4" type="submit" name="action"  onClick={handlesubmit}>
                        Login
                    </button>
                    <h6>
                        <Link to="/signup" >Are you new on chatgram?</Link>
                    </h6>
            
                </div>
            </div>
        </>
    )
}
export default Signin;