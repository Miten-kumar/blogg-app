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
  const ProceedLogin = (e) => {
    e.preventDefault();
    // console.log("proceed");
    axios
      .get("http://localhost:8000/User")
      .then((resp) => {
        if (
          resp["data"].find(
            (user) => user.username === username && user.password === password
          ) &&
          resp["data"].find(
            (user) => user.username === username && user.password === password
          ).role === "admin"
        ) {
          const validate = resp["data"].find(
            (user) => user.username === username && user.password === password
          );
          let role = resp["data"].find(
            (user) => user.username === username && user.password === password
          ).role;
          localStorage.setItem("Token", JSON.stringify(validate));
          localStorage.setItem("isLoggedIn", true);

          let id = resp["data"].find(
            (user) => user.username === username && user.password === password
          ).id;
          console.log(id);
          isLoggedIn = true;
          props.statusMethod(role, id);

          toast.success(username + " As a ADMIN  loged in");
          setTimeout(() => {
            navigate("/admin/blog");
          }, 1000);
          props.props(isLoggedIn, username, password);
        } else if (
          resp["data"].find(
            (user) => user.username === username && user.password === password
          )
        ) {
          isLoggedIn = true;
          const validate = resp["data"].find(
            (user) => user.username === username && user.password === password
          );
          localStorage.setItem("Token", JSON.stringify(validate));
          localStorage.setItem("isLoggedIn", true);
          let id = resp["data"].find(
            (user) => user.username === username && user.password === password
          ).id;
          let role = resp["data"].find(
            (user) => user.username === username && user.password === password
          ).role;

          props.statusMethod(role, id);
          toast.success(username + " you loged in");
          setTimeout(() => {
            navigate("/blog");
          }, 1000);
          props.props(isLoggedIn, username, password);
        } else {
          isLoggedIn = false;
          let role = null;
          let id = null;
          props.props(isLoggedIn, username, password);
          props.statusMethod(role, id);
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Login Failed due to :" + err.message);
        console.log(err.message);
      });
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

          <p className="text-center mt-3">or:</p>
        </div>

        <MDBInput
          wrapperClass="mb-4"
          label="UserName"
          id="form1"
          value={username}
          onChange={(e) => usernameupdate(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
          value={password}
          onChange={(e) => passwordupdate(e.target.value)}
        />

        <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
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
