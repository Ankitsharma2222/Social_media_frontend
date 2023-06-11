import React from "react"
import { Link } from "react-router-dom";
function NavBar(){
    return (
        <>
            <nav>
                <div className="nav-wrapper">
                <Link to="#" className="brand-logo left ">Chatgram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/signin">Signin</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/createpost">Create post</Link></li>
                    <li><Link to="/profile">Profile</Link></li>

                </ul>
                </div>
            </nav>
        </>
    )
}
export default NavBar;