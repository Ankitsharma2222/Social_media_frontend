import React from "react"
import { Link } from "react-router-dom";
function Signin(){
    return (
        <>
            <div className="mycard " >
                <div className="card auth-card input-field">
                    <h2 className="brand-logo">Chatgram</h2>
                    <input type="text" placeholder="email" />
                    <input type="text" placeholder="password" />
                    <button className="btn waves-effect waves-light #4a148c purple darken-4" type="submit" name="action" >
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