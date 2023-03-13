import { useEffect, useState } from "react";
// import {  useNavigate } from "react-router-dom";
import AddBlog from "./AddBlog";
import { Button } from "@mui/material";

import Edit from './Edit';
import axios from 'axios';
import { toast } from 'react-toastify';
const DisplayData = (props) => {
  // console.log(props.props.isLoggedIn);
  const [empdata, empdatachange] = useState(null);
  const [Data1, setData1] = useState({});
  const[name,setname]=useState("")
  const[email,setemail]=useState("")
  const[password,setpassword]=useState(" ")
const[Delete,removeDelete]=useState(true)

  const Remove = (id) => {
    // event.preventDefault();
    axios.delete(`http://localhost:8000/employee/${id}`)
    .then(res => {
      toast.error("DELETED!!!")
    console.log(res);
    console.log(res.data);
    removeDelete(!Delete)
    })
   } 
   
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
  }, [Data1,Delete]);

  const UpdateData = (id) => {
    console.warn(empdata[id-1]);
    let item=empdata[id-1]
    setname(item.name)
    setemail(item.email)
    setpassword(item.password)
  };
  return (
    <div className="container my-3 border ">
    <>
<input value={name}></input>
<input value={email}></input>
<input value={password}></input>
    </>
     
      <div className="card">
        {/* ADD BUTTON................... */}
        {props.props.isLogged === true ? <AddBlog load={Load} /> : <></>}
 
        <div className="card-body">
          <table className="table table-bordered ">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td > Name</td>
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
                     <Edit props={()=>UpdateData}/>
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

export default DisplayData;
