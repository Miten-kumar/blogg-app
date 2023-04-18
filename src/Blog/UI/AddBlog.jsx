import React, { useState } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addData } from "./Store/UserSlice";
import { useForm } from "react-hook-form";

export default function AddBlog(props) {
  const [basicModal, setModal] = useState(false);
  const toggleshow = () => setModal(!basicModal);
  const reload = true;
  const dispatch = useDispatch();
  const { register, handleSubmit,reset } = useForm();

  const onSubmit = (data) => {
    let adddata = {
      name: data.name,
      email: data.email,
      password: data.password,
      userId: props.props,
      image: data.image[0],
    };
    // console.log(adddata);
    dispatch(addData(adddata)).then((res) => {
      props.load(!reload);
    });
    reset()
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
      <form onSubmit={handleSubmit(onSubmit)} >
        <MDBModal show={basicModal} setShow={setModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add your Blog details</MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Title"
                  {...register("name")}
                  id="Name"
                  type="Name"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Category"
                  id="email"
                  {...register("email")}
                  type="category"
                />
                <MDBInput
                  label="Description"
                  id="password"
                  rows={4}
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
                  onChange={(e) => {}}
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
