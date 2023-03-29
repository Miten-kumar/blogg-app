import { MDBBtn, MDBCheckbox, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
    result = await result.json();
    console.log(result.user);
    if (result.user.role === "admin") {
      isLoggedIn = true;
      props.statusMethod(result.user.role, result.user._id);
      props.props(isLoggedIn, result.user.username, result.user.password);
      localStorage.setItem("Token", JSON.stringify(result.user));
      localStorage.setItem("login-auth", JSON.stringify(result.auth));
      localStorage.setItem("username", JSON.stringify(result.user.username));
      localStorage.setItem("isLoggedIn", true);
      toast.success(result.user.username + " You As  ADMIN");
      setTimeout(() => {
        navigate("/admin/blog");
      }, 1000);
    } else if (result.user.role === "user") {
      isLoggedIn = true;
      props.props(isLoggedIn, result.user.username, result.user.password);
      props.statusMethod(result.user.role, result.user._id);
      localStorage.setItem("Token", JSON.stringify(result.user));
      localStorage.setItem("login-auth", JSON.stringify(result.auth));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", JSON.stringify(result.user.username));
      toast.success(result.user.username + " Loged in");
      setTimeout(() => {
        navigate("/blog");
      }, 1000);
    } else {
      isLoggedIn = false;
      result.user.role = null;
      result.user._id = null;
      props.statusMethod(result.user.role, result.user._id);
      props.props(isLoggedIn, result.user.username, result.user.password);
    }
  }
  // localStorage.setItem("sign-auth",JSON.stringify(result.auth))

  // axios
  //   .get("http://localhost:5000/get")
  //   .then((resp) => {
  //     if (
  //       resp["data"].find(
  //         (user) => user.username === username && user.password === password
  //       ) &&
  //       resp["data"].find(
  //         (user) => user.username === username && user.password === password
  //       ).role === "admin"
  //     ) {
  //       const validate = resp["data"].find(
  //         (user) => user.username === username && user.password === password
  //       );
  //       let role = resp["data"].find(
  //         (user) => user.username === username && user.password === password
  //       ).role;
  //       localStorage.setItem("Token", JSON.stringify(validate));
  //       localStorage.setItem("isLoggedIn", true);

  //       let _id = resp["data"].find(
  //         (user) => user.username === username && user.password === password
  //       )._id;
  //       isLoggedIn = true;
  //       props.statusMethod(role, _id);

  // toast.success(username + " As a ADMIN  loged in");
  //       setTimeout(() => {
  //         navigate("/admin/blog");
  //       }, 1000);
  // props.props(isLoggedIn, username, password);
  //     } else if (
  //       resp["data"].find(
  //         (user) => user.username === username && user.password === password
  //       )
  //     ) {
  //       isLoggedIn = true;
  //       const validate = resp["data"].find(
  //         (user) => user.username === username && user.password === password
  //       );
  //       localStorage.setItem("Token", JSON.stringify(validate));
  //       localStorage.setItem("isLoggedIn", true);
  //       let _id = resp["data"].find(
  //         (user) => user.username === username && user.password === password
  //       )._id;
  //       let role = resp["data"].find(
  //         (user) => user.username === username && user.password === password
  //       ).role;

  //       props.statusMethod(role, _id);
  //       toast.success(username + " you loged in");
  //       setTimeout(() => {
  //         navigate("/blog");
  //       }, 1000);
  //       props.props(isLoggedIn, username, password);
  //     } else {
  //       isLoggedIn = false;
  //       let role = null;
  //       let _id = null;
  //       props.props(isLoggedIn, username, password);
  //       props.statusMethod(role, _id);
  //       toast.error("something went wrong");
  //     }
  //   })
  //   .catch((err) => {
  //     toast.error("Login Failed due to :" + err.message);
  //     console.log(err.message);
  //   });
  // }
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

          <p className="text-center mt-3">or:</p>
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
          <a href="!#">Forgot password?</a>
        </div>
        <MDBBtn className="mb-4 w-100" type="submit">
          Sign in
        </MDBBtn>
      </form>
    </div>
  );
}
