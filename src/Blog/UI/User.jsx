import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = (props) => {
  const [state, setState] = useState([]);
  const [reloade, setrelode] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/get").then((response) => {
      setState([...response["data"]]);
    });
  }, [reloade]);

  return (
    <div className="container p-0 mt-2">
      <table className="table table-hover table-primary text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>

            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {state
            .filter(
              (ele) =>
                ele.username === props.props && ele.password === props.password
            )
            .map((elem, index) => {
              return (
                <tr key={elem._id} className="p-0">
                  <th scope="col">{index + 1}</th>
                  <th scope="col">{elem.username}</th>

                  <th scope="col">{elem.email}</th>
                  <th scope="col">{elem.role}</th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
