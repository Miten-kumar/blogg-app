import {
  MDBBtn,
  MDBCheckbox,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login(props) {
  const [topRightModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!topRightModal);
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [isLoggedIn, setLoged] = useState();

  // useEffect(() => {
  //   sessionStorage.clear();
  // }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    ///implentation
    console.log("proceed");
    fetch("http://localhost:8000/User/")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);

        if (
          resp.find((user) => user.username === username) &&
          resp.find((user) => user.password === password)
        ) {
            
          // const Name = username.charAt(0);
          // const firstLetter = Name.toUpperCase();
          // document.getElementById("loginbtn").innerHTML = firstLetter;
          toast.success(username + " You log in ", {
            position: toast.POSITION.TOP_LEFT,
          });
          setLoged(true);
          // props.props(isLoggedIn);
          
        } else {
          setLoged(false);
          // props.props(isLoggedIn);
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Login Failed due to :" + err.message);
        console.log(err.message);
      });
      console.log(isLoggedIn);
  };

  return (
    <div className="navbar-nav ms-auto mb-2 mx-1">
      <MDBBtn className="mx-2" color="danger" tag="a" floating>
        <MDBIcon id="loginbtn" fas icon="loginbtn" />
      </MDBBtn>
      <MDBBtn onClick={toggleShow}>Login</MDBBtn>

        <MDBModal
          show={topRightModal}
          setShow={setBasicModal}
          tabIndex="-1"
          animationDirection="right"
        >
     
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Login</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>

              {/* modalbody......................................................... */}
              <MDBModalBody>
              <form onSubmit={ProceedLogin}>
                <div className="text-center mb-3">
                  <p>Sign in with:</p>

                  <div
                    className="d-flex justify-content-between mx-auto"
                    style={{ width: "40%" }}
                  >
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
                </MDBBtn></form>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
      
        </MDBModal>
    </div>
  );
}
