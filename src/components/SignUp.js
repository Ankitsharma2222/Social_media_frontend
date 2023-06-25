import React from "react"
import { Link, json } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import M from "materialize-css";

function SignUp(){
    const navigate=useNavigate();
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [profileUrl,setprofileUrl]=useState(undefined);
    const [image,setimage]=useState("")


    useEffect(()=>{
        if(profileUrl){
            UploadUser();
        }
    } , [profileUrl])

    const uploadImg=()=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","diap8ejji")

        fetch("https://api.cloudinary.com/v1_1/diap8ejji/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then((data)=>{
            setprofileUrl(data.url)
        })
        .catch((err)=>{
            console.log("error h cloudinary me" ,err)
        })


    }

    const UploadUser=()=>{
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
                email,
                profilePic:profileUrl
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
        .catch((err)=>{
            console.log("Error in signup file" ,err);
        })
    }

    const handlesubmit=()=>{
        if(image){
            uploadImg();
        }
        else{
            UploadUser();
        }

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
                        <div className="file-field input-field">
                        <div className=" btn #4a148c purple darken-1">
                            <span >Profile picture</span>
                            <input type="file"  onChange={(e)=>setimage(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                        </div>

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