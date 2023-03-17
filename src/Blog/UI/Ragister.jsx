import { MDBBtn, MDBCheckbox, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import React from "react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { addData } from "./Store/UserSlice";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [username, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users);
  // console.log(status);

  const navigate = useNavigate();

  const Data = {
    username: username,
    email: email,
    password: password,
    role: "user",
  };
  useEffect(() => {
    namechange("");
    emailchange("");
    passwordchange("");
  }, [status.success]);

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(addData(Data));
    // navigate("/login");
    toast.success("Successfully signed up. Please login.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    console.log("wefwde");
    // const empdata = { username, email, password , role : 'user'};
    // console.log(empdata);
    //   fetch("http://localhost:8000/User", {
    //     method: "POST",
    //     headers: { "content-type": "application/json" },
    //     body: JSON.stringify(empdata),
    //   })
    //     .then((res) => {
    //       toast.success("Successfully signed up. Please login.");
    //       setTimeout(() => {
    //         navigate("/login")

    //       }, 1000);
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //       toast.error("Failed :" + err.message);
    //     });
    // };
  };
  return (
    <div
      className="container w-50 mt-5  bg-light"
      style={{ boxShadow: "2px 2px 20px black" }}
    >
      <form onSubmit={handlesubmit}>
        <div className="text-center mb-3">
          <p>Sign up </p>

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
          label="Name"
          value={username}
          onChange={(e) => namechange(e.target.value)}
          id="form3"
          type="text"
        />

        <MDBInput
          wrapperClass="mb-4"
          label="Email"
          value={email}
          onChange={(e) => emailchange(e.target.value)}
          id="form4"
          type="email"
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form5"
          value={password}
          onChange={(e) => passwordchange(e.target.value)}
          type="password"
        />
        <div className="d-flex justify-content-center mb-4">
          <MDBCheckbox
            name="flexCheck"
            id="flexCheckDefault"
            label="I have read and agree to the terms"
          />
        </div>
        <MDBBtn className="mb-4 w-100" type="submit">
          Sign up
        </MDBBtn>
      </form>
    </div>
  );
}
