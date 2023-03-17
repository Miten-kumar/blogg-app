import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = (props) => {
  const [state, setState] = useState([]);
  const reloade = useState(true);

  console.log(props.password);

  useEffect(() => {
    axios.get("http://localhost:8000/User").then((response) => {
      //   console.log(response['data']);
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
            .map((elem) => {
              return (
                <tr key={elem.id} className="p-0">
                  <th scope="col">{elem.id}</th>
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
