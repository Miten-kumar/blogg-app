import { useEffect, useState, useCallback } from "react";
// import {  useNavigate } from "react-router-dom";
import AddBlog from "./AddBlog";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const EmpListing = (props) => {
  // console.log(props.props.isLoggedIn);
  const [empdata, empdatachange] = useState(null);
  const [Data1, setData1] = useState({});

  const Remove = useCallback((id) => {
    fetch("http://localhost:8000/employee/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        toast.error("Data Removed");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const Load = (function1) => {
    console.log(function1);
    setData1(() => function1);
  };

  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [Data1]);

  const UpdateData = () => {
    
  };
  return (
    <div className="container my-3 border ">
      <div className="card">
        {/* aDD BUTTON................... */}
        {props.props.isLogged === true ? <AddBlog load={Load} /> : <></>}

        <div className="card-body">
          <table className="table table-bordered ">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>category</td>
                <td>massage</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody className="table-primary">
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>
                      <Button className="btn btn-success" onClick={UpdateData}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          Remove(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        DELETE
                      </Button>
                      <Button className="btn btn-primary">Details</Button>
                    </td>
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
