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
} from "mdb-react-ui-kit";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { updateData } from "./Store/UserSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

export default function App(props) {
  const [basicModal, setBasicModal] = useState(false);
  // const [name, setname] = useState("");
  // const [password, setpassword] = useState(" ");
  // const [email, setemail] = useState("");
  // const [image, setImage] = useState(" ");
  const LoadedValues={
    name:props.props.name,
    email:props.props.email,
    password:props.props.password
  }
  const { register, handleSubmit } = useForm({
    defaultValues:LoadedValues
  });
  const reloade = true;
  const dispatch = useDispatch();
  const toggleShow = () => {
    // console.log(props.props.image);
    // console.log(props.Myid);
    
    // setImage(props.props.image);
    setBasicModal(!basicModal);
  };
  // const UpdateUser = () => {
  //   let _id = props.props._id;
  //   let userId = props.Myid;
  //   let item = { name, email, password, image, _id, userId };
  //   console.log(item);
    // dispatch(updateData(item)).then((res) => {
    //   props.data(!reloade);
    // });

  //   setTimeout(() => {
  //     props.data(reloade);
  //   }, 100);
  // };
  const onSubmit = (data) => {
    console.log(data.image[0])
    let _id = props.props._id;
    let userId = props.Myid;
    let adddata = {
      name: data.name,
      email: data.email,
      password: data.password,
      userId: userId,
      _id: _id,
      image: data.image[0],
    };
    console.log(adddata);

    dispatch(updateData(adddata)).then((res) => {
      props.data(!reloade);
    });
    setTimeout(() => {
      props.data(reloade);
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  label="Title"
                  {...register("name")}
                  id="Name"
                  type="Name"
                  // value={name}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Category"
                  id="email"
                  {...register("email")}
                  type="category"
                  // value={email}

                />
                <MDBInput
                  label="Description"
                  id="password"
                  rows={4}
                  // value={password}
                  {...register("password")}
                />
                <MDBInput
                  id="image"
                  name="image"
                  multiple
                  type="file"
                  {...register("image")}
                  className="mt-4"
                  accept="image/*"
                />
                </MDBModalBody>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn
                  onClick={() => {
                    toggleShow();
                  }}
                  type="submit"
                >
                  Save changes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </form>
    </>
  );
}
