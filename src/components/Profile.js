import React from "react"
import { useState,useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
function Profile(){
    const {state,dispatch}=useContext(UserContext)
    const [post,setpost]=useState([])

    useEffect(()=>{
        fetch("http://localhost:5000/myposts",{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then((result)=>{
            console.log(result)
            console.log(state)

            result.myposts.reverse()
            setpost(result.myposts)
        })
    },[])
    
    return (
        <>
            <div style={{maxWidth:"550px", margin:" 0px auto"}}>
                <div style={{display:"flex" ,justifyContent:"space-around",margin:"18px 0px" ,borderBottom:"1px solid grey"}}>
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
            </div>
        </>
    )
}
export default Profile;