import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import Edit from "./Edit";
import ViewDetails from "./ViewMore";
import axios from "axios";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { MDBBtn } from "mdb-react-ui-kit";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { Input } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
const DisplayData = (props) => {
  const [empdata, empdatachange] = useState([]);
  const [Data1, setData1] = useState({});
  const [ref, setref] = useState(true);
  const [Delete, removeDelete] = useState(true);
  const [relode, setrelode] = useState(true);
  const Remove = (_id) => {
    axios
      .delete(`http://localhost:5000/delete/${_id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("login-auth")
          )}`,
        },
      })
      .then((res) => {
        toast.error("Deleted!!!");

        removeDelete(!Delete);
      });
  };
  const update = (function2) => {
    setref(!function2);
    toast.success("ADDED!!!");
  };
  const Load = (function1) => {
    setData1(() => function1);
    setrelode(function1);
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    // console.log(key);
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("login-auth")
          )}`,
        },
      });
      result = await result.json();

      if (result) {
        empdatachange(result);
      } else {
        DisplayData();
      }
    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/getblogs", {
      headers: {
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("login-auth")
        )}`,
      },
    })
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
          <>
            <div className="d-flex">
              <AddBlog load={Load} props={props.props.userId} />
              <Form className="w-25 mt-4 ">
                <Input
                  type="search"
                  startAdornment={<SearchOutlinedIcon />}
                  placeholder="serach..."
                  onChange={searchHandle}
                  aria-label="Search"
                ></Input>
              </Form>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="card-body">
          {empdata.length > 0 ? (
            <table className="table table-bordered ">
              <thead className="table table-hover table-primary text-center">
                <tr>
                  <td>No</td>
                  <td> Name</td>
                  <td>category</td>
                  <td>massage</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody className="table-primary">
                {empdata &&
                  empdata.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
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
                            Remove(item._id);
                          }}
                        >
                          <DeleteForeverOutlinedIcon />
                        </MDBBtn>
                        {/* <ViewDetails props={item} /> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  No Record Found — <strong>check it out!</strong>
                </Alert>
              </Stack>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
