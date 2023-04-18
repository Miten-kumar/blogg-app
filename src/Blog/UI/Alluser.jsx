import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import LoadingBar from "react-top-loading-bar";
import HashLoader from "react-spinners/HashLoader";

const Users = () => {
  const [state, setState] = useState([]);
  const [reloade, setreload] = useState(true);
  const [progress, setProgress] = useState(70);

  const ChangeRole = (props, _id) => {
    if (props.role === "admin") {
      axios
        .put("http://localhost:5000/update/" + _id, {
          username: props.username,
          password: props.password,
          email: props.email,
          role: "user",
        })
        .then((response) => {
          // console.log(response);
          console.log("Changed to User");
          setreload(!reloade);
        });
    } else {
      axios
        .put("http://localhost:5000/update/" + _id, {
          username: props.username,
          password: props.password,
          email: props.email,
          role: "admin",
        })
        .then((response) => {
          // console.log(response['data']);
          console.log(response);
          // console.log("Changed to Admin");
          setreload(!reloade);
        });
    }
  };
  useEffect(
    () => {
      window.scrollTo(0, 0);
      axios.get("http://localhost:5000/get").then((response) => {
        // console.log(response['data']);
        setProgress(100);
        setState([...response["data"]]);
      });
    },
    [reloade],
    []
  );

  return (
    <div className="container my-3 border p-4">
      <LoadingBar
        color="#0080FF"
        height="4px"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {state?.length > 0 ? (
        <table className="table table-hover table-primary text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>

              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.map((elem, index) => {
              return (
                <tr key={elem._id} className="p-0">
                  <th scope="col">{index + 1}</th>
                  <th scope="col">{elem.username}</th>

                  <th scope="col">{elem.email}</th>
                  <th scope="col">{elem.role}</th>
                  <th scope="col">
                    <MDBDropdown>
                      <MDBDropdownToggle color="danger">
                        ChangeRole
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem
                          link
                          onClick={() => ChangeRole(elem, elem._id)}
                        >
                          User
                        </MDBDropdownItem>
                        <MDBDropdownItem
                          link
                          onClick={() => ChangeRole(elem, elem._id)}
                        >
                          admin
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <>
          <HashLoader
            color="#08cef4"
            loading
            cssOverride={{
              margin: "auto",
            }}
            size={90}
            speedMultiplier={1}
          />
        </>
      )}
    </div>
  );
};

export default Users;
