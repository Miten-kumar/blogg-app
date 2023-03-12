import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Blog/UI/Navbar.jsx";
import DisplayData from "./Blog/UI/DisplayData";
import Register from "./Blog/UI/Ragister.jsx";
import Login from "./Blog/UI/Login.jsx";
import Alluser from "./Blog/UI/Alluser"
import { useNavigate } from "react-router-dom";
import Admin from './Blog/UI/AdminHome';

function App() {
  const [isLogged, setisLogged] = useState(null);
  const [username, setUsername] = useState("");
  const status = (data, user) => {
    setisLogged(data);
    setUsername(user);
    console.log(username);
    // console.log(data);
  };
  const history = useNavigate();
  const logoutSubmitHandler = () => {
    history("/login");
    setisLogged(false);
    console.log("Runned");
  };
  return (
    <>
      <Navbar props={{ isLogged, username, logoutSubmitHandler }} />

      <Routes>
        <Route path="/" exact element={<div>This is Home Component</div>} />
        <Route
          path="/blog"
          element={<DisplayData props={{ isLogged, username }} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login props={status} />} />
        <Route path="/admin"  element={<Admin />}>
          <Route path="alluser"  element={<Alluser />}/>
        </Route>
      </Routes>

      <Outlet />
    </>
  );
}

export default App;
