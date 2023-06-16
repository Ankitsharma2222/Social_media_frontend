import React from "react"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
function NavBar(){
    const navigate=useNavigate()
    const {state,dispatch}=useContext(UserContext)
    const NavList=()=>{
        if(state){
            return  [
                    <li><Link to="/createpost">Create post</Link></li>,
                    <li><Link to="/profile">Profile</Link></li>,
                    <li>
                        <button className="btn waves-effect waves-light #4a148c purple darken-4" type="submit" name="action"  
                        onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            navigate("/signin")

                        }}
                        >
                        Logout
                        </button>
                    </li>
                ]
            
        }
        else{
           return [
            <li><Link to="/signin">Signin</Link></li>,
            <li><Link to="/signup">SignUp</Link></li>
            ]
        }
    }
    return (
        <>
            <nav>
                <div className="nav-wrapper">
                <Link to={state ? "/" : "/signin"} className="brand-logo left ">Chatgram</Link>
                <ul id="nav-mobile" className="right ">
                {NavList()}
                </ul>
                </div>
            </nav>
        </>
    )
}
export default NavBar;