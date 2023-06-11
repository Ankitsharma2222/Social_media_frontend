import './App.css';
import React from "react"
import NavBar from './components/NavBar';
import { BrowserRouter , Route, Routes} from 'react-router-dom' 
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <NavBar/>
        </div>
        <Routes>
          <Route path='/'  element={<><Home/></>} />
          <Route path='/signup'  element={<><SignUp/></>} />
          <Route path='/login'  element={<><Login/></>} />
          <Route path='/profile'  element={<><Profile/></>} />

        </Routes>
  
    </BrowserRouter>
  );
}

export default App;
