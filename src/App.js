import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Blog/UI/Navbar.jsx";
import DisplayData from "./Blog/UI/DisplayData";
import Register from "./Blog/UI/Ragister.jsx";
import Login from "./Blog/UI/Login.jsx";
import Alluser from "./Blog/UI/Alluser";
import { useNavigate } from "react-router-dom";
import Admin from "./Blog/UI/AdminHome";
import Protected from "./Blog/UI/Protekted.js";
import MyBlog from "./Blog/UI/MyBlog";
import Users from "./Blog/UI/User.jsx";
function App() {
  const [isLogged, setisLogged] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  

  // const [ref, setref] = useState(null);
  const [Role, setRole] = useState("");
  const [userId, setuserId] = useState("");
  const statusMethod = (role, id) => {
    setRole(role);
    console.log(role);
    setuserId(id);
  };

  const status = (data, user,password) => {
    setisLogged(data);
    setUsername(user);
    setpassword(password)
    // console.log(username);
    // console.log(data);
  };
  const history = useNavigate();
  const logoutSubmitHandler = () => {
    history("/login");
    setisLogged(false);
    setRole("user");
    setuserId(userId);
    // console.log("Runned");
  };
  return (
    <>
      <Navbar props={{ isLogged, username, logoutSubmitHandler, Role }} />

      <Routes>
        <Route path="/" exact element={<div>This is Home Component</div>} />
        <Route
          path="/blog"
          element={<DisplayData props={{ isLogged, username,userId ,Role}} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login props={status} statusMethod={statusMethod} />}
        />
         <Route
          path="/details"
          element={<Users props={username} password={password} />}
        />
        <Route
          path="/admin"
          element={
            <Protected isLogged={isLogged}>
              <Admin />
            </Protected>
          }
        >
          <Route path="alluser" element={<Alluser />} />
        
          <Route
            path="blog"
            element={
              <DisplayData props={{ isLogged, username, Role, userId }} />
            }
          />
          <Route
            path="myblog"
            element={<MyBlog props={{ isLogged, username, Role, userId }} />}
          />
        </Route>
      </Routes>

      <Outlet />
    </>
  );
}

export default App;
