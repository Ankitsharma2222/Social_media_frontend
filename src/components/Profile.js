import React from "react"
import { useState,useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { json } from "react-router-dom";
function Profile(){
    const {state,dispatch}=useContext(UserContext)
    const [post,setpost]=useState([])
    const [dp,setdp]=useState("")

    useEffect(()=>{
        fetch("http://localhost:5000/myposts",{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then((result)=>{
            // console.log(result)

            result.myposts.reverse()
            setpost(result.myposts)
        })
    },[])
    
    useEffect(()=>{
        if(dp){
            const data=new FormData()
            data.append("file",dp)
            data.append("upload_preset","insta-clone")
            data.append("cloud_name","diap8ejji")
    
            fetch("https://api.cloudinary.com/v1_1/diap8ejji/image/upload",{
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data.url)
                fetch("http://localhost:5000/updateDp",{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },           
                    body: JSON.stringify({
                        profilePic:data.url
                    })      
                })
                .then((res)=>res.json())
                .then((result)=>{
                    localStorage.setItem("user",JSON.stringify({...state ,profilePic:result.profilePic}))
                    dispatch({type:"UPDATEPIC",payload:result.profilePic})
                })
            })
            .catch((err)=>{
                console.log("error h cloudinary me" ,err)
            })
        }
    } ,[dp])

    const updatePhoto =(file)=>{
        setdp(file);

    }
    return (
        <>
            <div style={{maxWidth:"550px", margin:" 0px auto"}}>
                <div style={{margin:"18px 0px" ,borderBottom:"1px solid grey"}}>
                    <div style={{display:"flex" ,justifyContent:"space-around"}}>
                        <div>
                            <img  src={state ? state.profilePic : "loading..."} style={{width:"160px" , height:"160px" , borderRadius:"80px"}} />
    

                        </div>
                        <div>
                            <h4>{state ? state.name : "Loading"}</h4>

                            {state ?
                            <div style={{display:"flex" , width:"110%" , justifyContent:"space-between "}}>
                                <h6>{post ? post.length : 0 } posts</h6>
                                <h6>{state.followers.length} follower</h6>
                                <h6>{state.following.length } following</h6>

                            </div>
                                : "Loading...."
                                }
                        </div>

                    </div>
                    <div className="gallery" style={{display:"flex" ,flexWrap:"wrap" ,justifyContent:"space-around"}}>
                        {post && post.map((item)=>{
                            return (

                                <img key={item._id} className="item"  src={item.image} />
                            )
                        })}


                    </div>
                    <div className="file-field input-field" style={{margin:"10px"}}>
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Update pic</span>
                            <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;