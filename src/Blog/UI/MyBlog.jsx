import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import Edit from "./Edit";
import { Form } from "react-bootstrap";
import { Input } from "@mui/material";
import axios from "axios";
import { MDBNavbarLink } from "mdb-react-ui-kit";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { RiDeleteBinLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import LoadingBar from "react-top-loading-bar";
import { NavLink } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
const Myblog = (props) => {
  const [empdata, empdatachange] = useState(null);
  const [Data1, setData1] = useState(true);
  const [ref, setref] = useState(true);
  const [Delete, removeDelete] = useState(true);
  const [progress, setProgress] = useState(70);
  const [length, setLength] = useState(true);
  const status = useSelector((state) => state.addblogs);
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
        toast.error("Deleted!!!", { autoClose: 200 });

        removeDelete(!Delete);
      });
  };
  const Load = (function1) => {
    setData1(function1);
    console.log(function1);
  };
  const update = (function2) => {
    setref(function2);
    toast.success("ADDED!!!", { autoClose: 200 });
  };
  const searchHandle = async (e) => {
    let key = e.target.value;
    console.log(key);
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
      }
    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/getblogs")
      .then((res) => {
        // setData1(Data1);
        setProgress(100);
        setLength(false);
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
        console.log("sucess");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [status.success, ref, Delete]);

  return (
    <div className="container my-3 border ">
      <div className="card">
        <LoadingBar
          color="#00BFFF"
          height="3px"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        {/* ADD BUTTON................... */}
        {props.props.isLogged === true || props.props.isLoged ? (
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
          <> </>
        )}

        <div className="card-body">
          <HashLoader
            color="#08cef4"
            loading={length}
            cssOverride={{
              margin: "auto",
            }}
            size={70}
            speedMultiplier={1}
          />
          {empdata && empdata.length > 0 ? (
            <table className="table table-bordered ">
              <thead className="table table-hover table-primary text-center">
                <tr>
                  <td>No</td>
                  <td>Author </td>
                  <td>Category</td>

                  <td>Actions</td>
                </tr>
              </thead>
              <tbody className="table-primary">
                {empdata
                  .filter((blog) => blog.userId === props.props.userId)
                  .map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>

                      <MDBNavbarLink>
                        <NavLink to={`/viewmore/${item._id}`}>
                          <td>{item.name}</td>
                        </NavLink>
                      </MDBNavbarLink>

                      <td>{item.email}</td>
                      <td>
                        <Edit
                          props={item}
                          data={update}
                          Myid={props.props.userId}
                        />
                        <RiDeleteBinLine
                          onClick={() => {
                            Remove(item._id);
                          }}
                          cursor={"pointer"}
                          className="mx-1"
                          fontSize={"25px"}
                          color="#EC4A4A"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Delete !!"
                          data-tooltip-variant="error"
                        />
                        <Tooltip id="my-tooltip" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : length === false ? (
            <>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>check it out!</strong>
                </Alert>
              </Stack>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Myblog;
