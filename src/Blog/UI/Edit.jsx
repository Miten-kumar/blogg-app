import React, { useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { updateData } from "./Store/UserSlice";
import { useDispatch } from 'react-redux';

export default function App(props) {
  const [basicModal, setBasicModal] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(" ");
  const reloade = true;
  const dispatch=useDispatch()
  const toggleShow = () => {
    // console.log(props.props);
    // console.log(props.Myid);
    setname(props.props.name);
    setemail(props.props.email);
    setpassword(props.props.password);
    setBasicModal(!basicModal);
  };
  const UpdateUser = () => {
    let _id = props.props._id;
    let userId=props.Myid
    let item = { name, email, password, _id, userId };
    dispatch(updateData(item)).then((res) => {
      props.data(!reloade)
    });

    setTimeout(() => {
      props.data(reloade)
      
    }, 100);
  };

  return (
    <>
      <FaEdit
        onClick={toggleShow}
        className="mx-3"
        fontSize={"25px"}
        color="#45B39D"
        cursor={"pointer"}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Update/Edit"
        data-tooltip-variant="info"
      />
     <Tooltip id="my-tooltip" /> 
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBModalBody>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  _id="Name"
                  type="Name"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Category"
                  _id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="category"
                />
                <MDBTextArea
                  label="Message"
                  _id="textAreaExample"
                  rows={4}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </MDBModalBody>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  UpdateUser();
                  toggleShow();
                }}
              >
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
