import { useEffect, useState } from "react";
// import {  useNavigate } from "react-router-dom";


const EmpListing = (props) => {
    const [empdata, empdatachange] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/User")
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            empdatachange(resp);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
  return (
    <div className="container my-3  border ">
      <div className="card">
        {/* aDD BUTTON................... */}

        <div className="card-body p-0">
          <table className="table table-bordered  ">
            <thead className="bg-dark text-white ">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Password</td>
              </tr>
            </thead>
            <tbody className="table-primary">
            {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    {/* <td><a onClick={() => { LoadEdit(item.id) }}  className="btn btn-success">Edit</a>
                                        <a onClick={() => { Removefunction(item.id) }}  className="btn btn-danger">Remove</a>
                                        <a onClick={() => { LoadDetail(item.id) }}  className="btn btn-primary">Details</a>
                                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
