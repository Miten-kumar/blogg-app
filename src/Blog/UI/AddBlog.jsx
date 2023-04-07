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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addData } from "./Store/UserSlice";
export default function AddBlog(props) {
  const [basicModal, setModal] = useState(false);
  const toggleshow = () => setModal(!basicModal);
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [image, setimage] = useState("");
  const reload = true;
  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    e.preventDefault();

    let adddata = {
      name: name,
      email: email,
      password: password,
      userId: props.props,
      image: image,
    };

    dispatch(addData(adddata)).then((res) => {
      props.load(!reload);
    });

    setTimeout(() => {
      props.load(reload);
    }, 100);
  };

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
                />
                <MDBTextArea
                  label="Message"
                  id="password"
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
