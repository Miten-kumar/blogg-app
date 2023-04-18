import { MDBBtn, MDBCheckbox, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();

  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  let isLoggedIn = null;
  const ProceedLogin = async (e) => {
    e.preventDefault();
    const empdata = { username, password };
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"},
       
      body: JSON.stringify(empdata),
    });
    // console.log(result.status);
    
    if (result.status === 401 || result.status === 403) {
      toast.error("something went wrong");
    }
    result = await result.json();
    if (result.user.role === "admin") {
      isLoggedIn = true;
      props.statusMethod(result.user.role, result.user._id);
      props.props(isLoggedIn, result.user.username, result.user.password);
      localStorage.setItem("Token", JSON.stringify(result.user));
      localStorage.setItem("login-auth", result.auth);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("username", JSON.stringify(result.user.username));
      localStorage.setItem("isLoggedIn", true);
      toast.success(result.user.username + "(Admin) Login");
      setTimeout(() => {
        navigate("/admin/blog");
      }, 1000);
    } else if (result.user.role === "user") {
      isLoggedIn = true;
      props.props(isLoggedIn, result.user.username, result.user.password);
      props.statusMethod(result.user.role, result.user._id);
      localStorage.setItem("Token", JSON.stringify(result.user));
      localStorage.setItem("login-auth", result.auth);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", JSON.stringify(result.user.username));
      toast.success(result.user.username + " Loged in");
      setTimeout(() => {
        navigate("/blog");
      }, 1000);
    } else {
      toast.error("something went wrong");
      isLoggedIn = false;
      result.user.role = null;
      result.user._id = null;
      props.statusMethod(result.user.role, result.user._id);
      props.props(isLoggedIn, result.user.username, result.user.password);
    }
  };
  return (
    <div
      className="container mt-5 w-50 "
      style={{ boxShadow: "2px 2px 20px black" }}
    >
      <form onSubmit={ProceedLogin}>
        <div className="text-center  mb-3 ">
          <p>Sign in </p>

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "40%" }}
          >
            <ToastContainer />
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>

          <p className="text-center mt-3">OR :</p>
        </div>

        <MDBInput
          wrapperClass="mb-4"
          label="UserName"
          _id="form1"
          value={username}
          onChange={(e) => usernameupdate(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          _id="form2"
          type="password"
          value={password}
          onChange={(e) => passwordupdate(e.target.value)}
        />

        <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            _id="flexCheckDefault"
            label="Remember me"
          />
          <NavLink to="forgotpassword">Forgot password?</NavLink>
        </div>
        <MDBBtn className="mb-4 w-100" type="submit">
          Sign in
        </MDBBtn>
      </form>
    </div>
  );
}
