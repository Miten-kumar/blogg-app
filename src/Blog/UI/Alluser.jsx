import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";

const Users = () => {
  const [state, setState] = useState([]);
  const [reloade, setreload] = useState(true);
  const ChangeRole = (props, id) => {
    if (props.role === "admin") {
      axios
        .put("http://localhost:8000/User/" + id, {
          username: props.username,
          password: props.password,
          email: props.email,
          role: "user",
        })
        .then((response) => {
          console.log(response);
          console.log("Changed to User");
          setreload(!reloade);
        });
    } else {
      axios
        .put("http://localhost:8000/User/" + id, {
          username: props.username,
          password: props.password,
          email: props.email,
          role: "admin",
        })
        .then((response) => {
          // console.log(response['data']);
          console.log(response);
          console.log("Changed to Admin");
          setreload(!reloade);
        });
    }
  };
  useEffect(() => {
    axios.get("http://localhost:8000/User").then((response) => {
      // console.log(response['data']);
      setState([...response["data"]]);
    });
  }, [reloade]);

  return (
    <div className="container my-3 border p-4">
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
          {state.map((elem) => {
            return (
              <tr key={elem.id} className="p-0">
                <th scope="col">{elem.id}</th>
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
                        onClick={() => ChangeRole(elem, elem.id)}
                      >
                        User
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        onClick={() => ChangeRole(elem, elem.id)}
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
    </div>
  );
};

export default Users;
