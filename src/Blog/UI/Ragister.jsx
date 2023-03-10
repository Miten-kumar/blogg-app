import {
  MDBBtn,
  MDBCheckbox,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [centredModal, setCentredModal] = useState(false);

  const toggleshow = () => setCentredModal(!centredModal);

  const [username, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault(); 
    
    console.log("wefwde");
    const empdata = { username, email, password };
    console.log(empdata);
    fetch("http://localhost:8000/User", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        toast.success('Successfully signed up. Please login.');
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed :" + err.message);
      });
      
  };

  return (
    <div>
      <MDBBtn onClick={toggleshow}>Register</MDBBtn>
      
      
        <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Modal title</MDBModalTitle><MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleshow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
              <form onSubmit={handlesubmit}>
                <div className="text-center mb-3">
                  <p>Sign un with:</p>

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
                <MDBBtn
                  className="mb-4 w-100"
                  onClick={toggleshow}
                  type="submit"
                >
                  Sign up
                </MDBBtn></form>
              </MDBModalBody><ToastContainer />
              <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleshow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      
    </div>
  );
}
