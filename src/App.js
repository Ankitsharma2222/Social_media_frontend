import './App.css';
import React from "react"
import NavBar from './components/NavBar';
import { BrowserRouter , Route, Routes} from 'react-router-dom' 
import Home from './components/Home';
import Login from './components/SignIn';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <BrowserRouter>
        <div>
          <NavBar/>
        </div>
        <Routes>
          <Route path='/'  element={<><Home/></>} />
          <Route path='/signup'  element={<><SignUp/></>} />
          <Route path='/signin'  element={<><Login/></>} />
          <Route path='/profile'  element={<><Profile/></>} />
          <Route path='/createpost'  element={<><CreatePost/></>} />


        </Routes>
  
    </BrowserRouter>
  );
}

export default App;
