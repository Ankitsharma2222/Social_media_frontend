import React from "react"
import { useState,useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import Loading from "./loadingPage";
function OtherUserProfile(){
    const {state,dispatch}=useContext(UserContext)
    const [Userprofile,setUserprofile]=useState(null)
    const [showFollowButton ,setfollowButton]=useState(true)
    const {userId}=useParams()
    useEffect(()=>{
        fetch(`http://localhost:5000/getUser/${userId}`,{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then((result)=>{
            setUserprofile(result)
        })
    },[])

//-------------------------------------------------------------------------------------------------------------

    const followUser = ()=>{
        fetch('http://localhost:5000/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userId
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             console.log(data);
             setUserprofile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                       }
                }
                 
             })
             setfollowButton(false);
        })
    }
    
//-------------------------------------------------------------------------------------------------------------------------

const unfollowUser = ()=>{
    fetch('http://localhost:5000/unfollow',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            unfollowId:userId
        })
    }).then(res=>res.json())
    .then(data=>{
    
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
         localStorage.setItem("user",JSON.stringify(data))
         console.log(data);
         setUserprofile((prevState)=>{
             const newfollowers= prevState.user.followers.filter((item)=> item !== data._id);
             return {
                 ...prevState,
                 user:{
                    ...prevState.user,
                    followers:newfollowers
                   }
            }
             
         })
         setfollowButton(true);
    })
}

//-------------------------------------------------------------------------------------------------------------------------
    return (
        <>
            {Userprofile ?
            <div style={{maxWidth:"550px", margin:" 0px auto"}}>
                <div style={{display:"flex" ,justifyContent:"space-around",margin:"18px 0px" ,borderBottom:"1px solid grey"}}>
                    <div>
                        <img  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" style={{width:"160px" , height:"160px" , borderRadius:"80px"}} />

                    </div>
                    <div>
                        <h4>{Userprofile.user.name ? Userprofile.user.name : "Loading"}</h4>
                        <div style={{display:"flex" , width:"110%" , justifyContent:"space-between "}}>
                            <h6>{Userprofile.posts.length} posts</h6>
                            <h6>{Userprofile.user.followers.length} follower</h6>
                            <h6>{Userprofile.user.following.length} following</h6>

                        </div>
                        { showFollowButton && !Userprofile.user.followers.includes(state._id) ?
                        <button className="btn waves-effect waves-light #4a148c purple darken-4" type="submit" name="action"  onClick={followUser}>
                        Follow
                        </button>
                        :
                        <button className="btn waves-effect waves-light #4a148c purple darken-4" type="submit" name="action"  onClick={unfollowUser}>
                        unfollow
                        </button>
                        }
                    </div>

                </div>
                <div className="gallery" style={{display:"flex" ,flexWrap:"wrap" ,justifyContent:"space-around"}}>
                    {Userprofile.posts && Userprofile.posts.map((item)=>{
                        return (

                            <img key={item._id} className="item"  src={item.image} />
                        )
                    })}


                </div>
            </div>
            : <Loading/> }
        </>
    )
}
export default OtherUserProfile;