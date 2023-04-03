import React, { useState } from "react";
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
  MDBFile,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addblogs } from "./Store/UserSlice";
export default function AddBlog(props) {
  // console.log(props.props);
  const [basicModal, setModal] = useState(false);
  const toggleshow = () => setModal(!basicModal);
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [image, setimage] = useState("");
  const [reload, setReload] = useState(true);
  const dispatch=useDispatch()
  const handlesubmit = (e) => {
    e.preventDefault(); 
    dispatch(addblogs())
    axios
      .post(
        "http://localhost:5000/addblogs",
        {
          name: name,
          email: email,
          password: password,
          userId: props.props,
          image: image,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success("Successfully Add Your Blog.", { autoClose: 200 });

        setReload(!reload);
        props.load(!reload);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed :" + err.message);
      });
  };
  // const convertbase64 = (e) => {
  //   console.log(e);
  //   var reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = () => {
  //     console.log(reader.result); //base64encoded string
  //     setimage(reader.result);
  //   };
  //   reader.onerror = (error) => {
  //     console.log("Enror: ".error);
  //   };
  // };
  return (
    <>
      <ToastContainer />
      <MDBBtn className="mx-4 mt-4 w-25" color="info" onClick={toggleshow}>
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
                  _id="Name"
                  type="Name"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Category"
                  _id="email"
                  value={email}
                  onChange={(e) => emailchange(e.target.value)}
                  type="category"
                />
                <MDBTextArea
                  label="Message"
                  _id="password"
                  rows={4}
                  value={password}
                  onChange={(e) => passwordchange(e.target.value)}
                />
                <MDBFile
                  id="image"
                  name="image"
                  className="mt-4"
                  accept="image/*"
                  onChange={(e) => {
                    setimage(e.target.files[0]);
                  }}
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn onClick={toggleshow} type="submit">
                  Save
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </form>
    </>
  );
}
