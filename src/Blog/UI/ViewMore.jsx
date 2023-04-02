import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Users = () => {
  const [state, setState] = useState([]);
  const [reloade, setrelode] = useState(true);
  const params = useParams();

  // console.log(params._id);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getblogs/" + params._id)
      .then((response) => {
        // console.log(response["data"]);
        setState([response["data"]]);
      });
  }, [reloade]);
  return (
    <div className="container p-0 mt-2">
      <table className="table table-hover table-primary text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> Author</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {state.map((elem, index) => {
            return (
              <tr key={elem._id} className="p-0">
                <th scope="col">{index + 1}</th>
                <th scope="col">{elem.name}</th>
                <th scope="col">{elem.email}</th>
                <th scope="col">{elem.password}</th>
                <th scope="col">
                  <td>
                    <img src={elem.image} alt="" width={"150px"} height={"150px"} />
                  </td>
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
