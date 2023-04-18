import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Blog/UI/Navbar.jsx";
import DisplayData from "./Blog/UI/DisplayData";
import Register from "./Blog/UI/Ragister.jsx";
import Login from "./Blog/UI/Login.jsx";
import Alluser from "./Blog/UI/Alluser";
import { useNavigate } from "react-router-dom";
import Admin from "./Blog/UI/AdminHome";
import Protected from "./Blog/UI/Protected";
import MyBlog from "./Blog/UI/MyBlog";
import Users from "./Blog/UI/User.jsx";
import AdminAllBlogs from "./Blog/UI/AdminAllBlog";
import ViewDetails from "./Blog/UI/ViewMore";
import Forgotpassword from "./Blog/UI/ForgotPassword.jsx";
import Resetpassword from "./Blog/UI/ResetPassword.jsx";
import axios from "axios";
function App() {
  const isLoged = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [isLogged, setisLogged] = useState(null);
  const [username, setUsername] = useState(
    isLoged === true ? JSON.parse(localStorage.getItem("Token")).username : ""
  );
  const [password, setpassword] = useState(
    isLoged === true ? JSON.parse(localStorage.getItem("Token")).password : ""
  );
  const [Role, setRole] = useState(
    isLoged === true ? JSON.parse(localStorage.getItem("Token")).role : ""
  );
  const [userId, setuserId] = useState(
    isLoged === true ? JSON.parse(localStorage.getItem("Token"))._id : ""
  );
  const statusMethod = (role, _id) => {
    setRole(role);
    // console.log(role);
    setuserId(_id);
  };

  const status = (data, user, password) => {
    setisLogged(data);
    // console.log(isLogged);
    setUsername(user);
    setpassword(password);
  };
  const history = useNavigate();
  const logoutSubmitHandler = () => {
    history("/login");
    setisLogged(false);
    setRole("user");
    setuserId(null);
    localStorage.clear();
  };

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("login-auth");
      if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // console.log(JSON.parse(localStorage.getItem("refreshToken")));
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(refreshToken);
        axios
          .post("http://localhost:5000/refreshToken", { Refresh: refreshToken })
          .then((res) => {
            // console.log(res);
            axios.defaults.headers.common["authorization"] =
              "Bearer " + refreshToken;
            localStorage.removeItem("login-auth");
            localStorage.setItem("login-auth", res.data);
            return axios(originalRequest);
          });
      }
      return Promise.reject(error);
    }
  );
  return (
    <>
      <Navbar
        props={{ isLogged, username, logoutSubmitHandler, Role, isLoged }}
      />

      <Routes>
        <Route path="/" element={<div>This is Home Component</div>} />
        <Route
          path="/blog"
          element={
            <DisplayData
              props={{ isLogged, username, userId, password, Role, isLoged }}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login props={status} statusMethod={statusMethod} />}
        />
        <Route path="login/forgotPassword" element={<Forgotpassword />} />
        <Route path={`resetPassword/:id/:token`} element={<Resetpassword />} />
        <Route
          path="/details"
          element={<Users props={username} password={password} />}
        />
        <Route path="viewmore/:_id" element={<ViewDetails />} />

        <Route
          path="/admin"
          element={
            <Protected isLogged={{ isLogged, isLoged }}>
              <Admin />
            </Protected>
          }
        >
          <Route path="alluser" element={<Alluser />} />

          <Route
            path="blog"
            element={
              <AdminAllBlogs
                props={{ isLogged, username, Role, userId, isLoged }}
              />
            }
          />
          <Route
            path="myblog"
            element={
              <MyBlog props={{ isLogged, username, Role, userId, isLoged }} />
            }
          ></Route>
        </Route>
      </Routes>

      <Outlet />
    </>
  );
}

export default App;
