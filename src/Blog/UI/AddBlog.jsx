import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import {
  MDBModal,
  MDBTextArea,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBlog(props) {
  // console.log(props.props);
  const [basicModal, setModal] = useState(false);
  const toggleshow = () => setModal(!basicModal);
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [reload, setReload] = useState(true);
  
  
  const handlesubmit = (e) => {
   
    e.preventDefault();
    console.log("wefwde");
    setReload(!reload)
    const empdata = { name, email, password, userId:props.props };
    
    fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        // alert("Saved successfully.");
        // window.location.reload()

        toast.success("Successfully Add Your Blog.");

      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed :" + err.message);
      });
    };
props.load(reload)

  return (
    <>
     <ToastContainer />
       <MDBBtn
          className="mx-1 mt-4 "
          color="info"
          onClick={toggleshow}
        >
          ADD Blog<sup>+</sup>
        </MDBBtn>
        <form onSubmit={handlesubmit}>
          <MDBModal show={basicModal} setShow={setModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Modal title</MDBModalTitle>
                 
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    value={name}
                    onChange={(e) => namechange(e.target.value)}
                    id="Name"
                    type="Name"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Category"
                    id="email"
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    type="category"
                  />{" "}
                  <MDBTextArea
                    label="Message"
                    id="textAreaExample"
                    rows={4}
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                  />
                </MDBModalBody>
                <MDBModalFooter>
                
                  <MDBBtn onClick={toggleshow} type="submit">Save</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </form>
      
    </>
  );
}
