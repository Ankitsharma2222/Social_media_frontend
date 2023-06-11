import React from "react"
import { Link, json } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

function SignUp(){
    const navigate=useNavigate();
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const handlesubmit=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
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
                M.toast({html:data.message,classes:"#43a047 green darken-1"})
                    navigate('/signin')
            }
        })

    } 

    return (
        <>
            <div className="mycard" >
                <div className="card auth-card input-field">
                    <h2 className="brand-logo">Chatgram</h2>
                    <input 
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e)=>setname(e.target.value)}
                     />
                    <input
                        type="text" 
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setemail(e.target.value)}

                     />
                    <input 
                        type="text"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                     
                     />

                    <button className="btn waves-effect waves-light #4a148c purple darken-4" type="submit" name="action" onClick={handlesubmit} >
                        Sign up
                    </button>
                    <h6>
                        <Link to="/signin" >Already have a account ?</Link>
                    </h6>
            
                </div>
            </div>
        </>
    )
}
export default SignUp;