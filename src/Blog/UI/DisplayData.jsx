import { useEffect, useState } from "react";
// import {  useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);

useEffect(() => {
    fetch("http://localhost:8000/employee").then((res) => {
        return res.json();
    }).then((resp) => {
        empdatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])
return (
    <div className="container my-5 border ">
        <div className="card">
            <div className="card-title">
                <h2>BLOG</h2>
            </div>
            <div className="card-body">
                <div className="divbtn">
                </div>
                <table className="table table-bordered ">
                    <thead className="bg-dark text-white">
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>category</td>
                            <td>massage</td>

                        </tr>
                    </thead>
                    <tbody>
                        {empdata &&
                            empdata.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    {/* <td><a onClick={() => { LoadEdit(item.id) }}  className="btn btn-success">Edit</a>
                                        <a onClick={() => { Removefunction(item.id) }}  className="btn btn-danger">Remove</a>
                                        <a onClick={() => { LoadDetail(item.id) }}  className="btn btn-primary">Details</a>
                                    </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
}

export default EmpListing;
