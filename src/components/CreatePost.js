import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

const CreatePost=()=>{
    const navigate=useNavigate()
    const [title,settitle]=useState("")
    const [body,setbody]=useState("")
    const [image,setimage]=useState("")
    const [url,seturl]=useState("")
    useEffect(()=>{
        if(url){
            fetch("http://localhost:5000/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("jwt")}`
    
                },
                body:JSON.stringify({
                    title,
                    body,
                    image:url
                })
    
            })
            .then((res)=>res.json())                            
            .then((data)=>{
                if(data.error){
                    M.toast({html: data.error,classes:"#c62828 red darken-3"})
                }
                else{
                     console.log(data);
                    M.toast({html:"Post created ",classes:"#43a047 green darken-1"})
                        navigate('/')
                }
            })
            .catch((err)=>{
                console.log("Error in creating post" ,err);
            })

        }
    },[url])

    const postDetails=()=>{
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
            seturl(data.url)
        })
        .catch((err)=>{
            console.log("error h cloudinary me" ,err)
        })


    }






    return (
        <>
            <div className="card input-filed" style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}>
                <input type="text" placeholder="title" value={title} onChange={(e)=>settitle(e.target.value)} />
                <input type="text" placeholder="body" value={body} onChange={(e)=>setbody(e.target.value)} />
                <div className="file-field input-field">
                <div className=" btn #4a148c purple darken-1">
                    <span >Upload Image</span>
                    <input type="file"  onChange={(e)=>setimage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
                </div>
                <button className="btn waves-effect waves-light #4a148c purple darken-1" type="submit" name="action" onClick={postDetails} >
                        Post
                    </button>


            </div>
        
        
        </>
    )
}
export default CreatePost;