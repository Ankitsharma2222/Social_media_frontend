import React from "react"

function Home(){
    return (
        <>
            <div className="home">
                <div className="card home-card">
                    <h6>Ankit</h6>
                    <div className="card-image">
                        <img src="https://images.unsplash.com/photo-1683817411951-2134066fa3bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NDgzNzk5Mnx8ZW58MHx8fHx8&dpr=1&auto=format&fit=crop&w=294&h=294&q=60" />
                    </div>
                    <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                        <h6>title</h6>
                        <p>This is nice bro</p>
                        <input type="text" placeholder="Add a comment"/>
                    </div>

                </div>

            </div>
        </>
    )
}
export default Home;