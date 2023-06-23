import React from "react"
import { useState, useEffect ,useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import Loading from "./loadingPage";


function Explore(){
    const {state ,dispatch}=useContext(UserContext)
    const [data,setdata]=useState([])

//------------------------------------------------------------------------------------------------------------------
    
    useEffect(()=>{
        fetch("http://localhost:5000/myfollowingsposts",{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result)=>{
            // result.posts.reverse()
            setdata(result.posts);
        })
    },[])


//------------------------------------------------------------------------------------------------------------------


    const like=(id)=>{
        fetch("http://localhost:5000/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then((result)=>{
            // console.log(result);
            // return res.json(result)
            const newdata=data.map((item)=>{
                if(item._id===result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setdata(newdata);
        })
    }


//------------------------------------------------------------------------------------------------------------------

    const unlike=(id)=>{
        fetch("http://localhost:5000/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then((result)=>{
            // console.log(result);
            // return res.json(result)
            const newdata=data.map((item)=>{
                if(item._id===result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setdata(newdata);
        })
    }



//------------------------------------------------------------------------------------------------------------------

const makeComment = (text,postId)=>{
    fetch("http://localhost:5000/comment",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            text
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
       })
      setdata(newData)
    }).catch(err=>{
        console.log(err)
    })
}

//-----------------------------------------------------------------------------------------------------------------

const deletePost = (postId)=>{
    fetch(`http://localhost:5000/deletepost/${postId}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setdata(newData)
    })
}

//------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="home">
                {console.log(data)}
                { data.length >0 ? data.map((item)=>{
                    return (
                        <div className="card home-card">
                            <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>


                        <div className="card-image">
                            <img key={item._id} src={item && item.image} />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                            {item.likes.includes(state._id) ?
                            <i className="material-icons" style={{color:"black"}} onClick={()=>unlike(item._id)} >thumb_down</i>
                            :
                            <i className="material-icons" style={{color:"black"}}  onClick={()=>like(item._id)} >thumb_up</i>
                            }               
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.commentBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                            <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                        </div>
    
                    </div>
                    )
                }) : <Loading/>}

                

            </div>
        </>
    )
}
export default Explore;