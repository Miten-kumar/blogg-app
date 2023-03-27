import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import Edit from "./Edit";
import ViewDetails from "./ViewMore";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBBtn } from "mdb-react-ui-kit";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
const DisplayData = (props) => {
  console.log(props);
  const [empdata, empdatachange] = useState([]);
  const [Data1, setData1] = useState({});
  const [ref, setref] = useState(true);
  const [Delete, removeDelete] = useState(true);
  const [relode, setrelode] = useState(true);
  const Remove = (id) => {
    axios.delete(`http://localhost:8000/employee/${id}`).then((res) => {
      toast.error("Deleted!!!");
      console.log(res);
      // console.log(res.data);
      removeDelete(!Delete);
    });
  };
  const update = (function2) => {
    setref(!function2);
    toast.success("ADDED!!!");
  };
  const Load = (function1) => {
    // console.log(function1);
    console.log(function1);
    setData1(() => function1);
    setrelode(function1);
  };

  useEffect(() => {
    fetch("http://localhost:5000/getblogs")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [relode, Delete, ref, Data1]);
  return (
    <div className="container my-3 border ">
      <div className="card">
        {/* ADD BUTTON................... */}
        {props.props.isLogged === true || props.props.isLoged === true ? (
          <AddBlog load={Load} props={props.props.userId} />
        ) : (
          <></>
        )}

        <div className="card-body">
          <table className="table table-bordered ">
            <thead className="table table-hover table-primary text-center">
              <tr>
                <td>ID</td>
                <td> Name</td>
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
                      <Edit
                        props={item}
                        data={update}
                        Myid={props.props.userId}
                      />
                      <MDBBtn
                        className="btn btn-danger mx-1"
                        onClick={() => {
                          Remove(item.id);
                        }}
                      >
                        <DeleteForeverOutlinedIcon />
                      </MDBBtn>
                      <ViewDetails props={item} />
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
