import React, { useState } from "react";
import { Routes ,Route, Outlet } from "react-router-dom";
import Navbar from "./Blog/UI/Navbar.jsx"
import DisplayData from './Blog/UI/DisplayData'
import Register from "./Blog/UI/Ragister.jsx";
import Login from "./Blog/UI/Login.jsx";


function App() {
  const [isLogged,setisLogged]=useState(null)
  const [username , setUsername] = useState('')
  const status=(data,user)=>{
    setisLogged(data)
    setUsername(user)
    console.log(username);
    // console.log(data);
  }
  return (
    <>  
    <Navbar props={{isLogged,username}}/>

    <Routes>
    <Route path="/" element={<div>This is Home Component</div>}/>
    <Route path="/blog" element={<DisplayData />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login props={status}/>}/>
    </Routes>
    
    <Outlet />
    </>
  );
}

export default App;
