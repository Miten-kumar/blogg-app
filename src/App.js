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
import AdminAllBlogs from "./Blog/UI/AdminAllBlog"
function App() {
  const isLoged = JSON.parse(localStorage.getItem('isLoggedIn'))
  const [isLogged, setisLogged] = useState(null);
  const [username, setUsername] = useState(isLoged === true ? JSON.parse(localStorage.getItem('Token')).username : '');
  const [password, setpassword] = useState(isLoged === true ? JSON.parse(localStorage.getItem('Token')).password : '');
  const [Role, setRole] =useState(isLoged === true ? JSON.parse(localStorage.getItem('Token')).role : '');
  const [userId, setuserId] =useState(isLoged === true ? JSON.parse(localStorage.getItem('Token')).id : '');
  const statusMethod = (role, id) => {
    setRole(role);
    console.log(id);
    setuserId(id);
  };

  const status = (data, user,password) => {
    setisLogged(data);
    setUsername(user);
    setpassword(password)
   
  };
  const history = useNavigate();
  const logoutSubmitHandler = () => {
    history("/login");
    setisLogged(false);
    setRole("user");
    setuserId(null);
localStorage.clear()

  };
  return (
    <>
   

      <Navbar props={{ isLogged, username, logoutSubmitHandler, Role,isLoged}} />

      <Routes>
        <Route path="/"  element={<div>This is Home Component</div>} />
        <Route
          path="/blog"
          element={<DisplayData props={{ isLogged, username,userId ,password,Role,isLoged}} />}
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
            <Protected isLogged={{isLogged,isLoged}}>
              <Admin />
            </Protected>
          }
        >
          <Route path="alluser" element={<Alluser />} />
        
          <Route
            path="blog"
            element={
              <AdminAllBlogs props={{ isLogged, username, Role, userId,isLoged }} />
            }
          />
          <Route
            path="myblog"
            element={<MyBlog props={{ isLogged, username, Role, userId ,isLoged}} />}
          />
        </Route>
      </Routes>

      <Outlet />
    
    </>
  );
}

export default App;
