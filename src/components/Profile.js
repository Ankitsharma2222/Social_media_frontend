import React from "react"

function Profile(){
    return (
        <>
            <div style={{maxWidth:"550px", margin:" 0px auto"}}>
                <div style={{display:"flex" ,justifyContent:"space-around",margin:"18px 0px" ,borderBottom:"1px solid grey"}}>
                    <div>
                        <img  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" style={{width:"160px" , height:"160px" , borderRadius:"80px"}} />

                    </div>
                    <div>
                        <h4>Ankit Sharma</h4>
                        <div style={{display:"flex" , width:"110%" , justifyContent:"space-between "}}>
                            <h6>10 posts</h6>
                            <h6>10 follower</h6>
                            <h6>10 following</h6>

                        </div>
                    </div>

                </div>
                <div className="gallery" style={{display:"flex" ,flexWrap:"wrap" ,justifyContent:"space-around"}}>
                    <img className="item"  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                    <img className="item"  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                    <img className="item"  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                    <img className="item"  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />


                </div>
            </div>
        </>
    )
}
export default Profile;