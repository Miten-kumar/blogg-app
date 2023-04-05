import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import Edit from "./Edit";
import axios from "axios";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { MDBNavbarLink } from "mdb-react-ui-kit";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Input } from "@mui/material";
import LoadingBar from "react-top-loading-bar";
import { RiDeleteBinLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import HashLoader from "react-spinners/HashLoader";
import { NavLink } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { getData, selectAllPosts } from "./Store/UserSlice";

const DisplayData = (props) => {
  const [empdata, setEmpdatachange] = useState([]);
  const [ref, setRef] = useState(true);
  const [Delete, removeDelete] = useState(true);
  const [relode, setRelode] = useState(false);
  const [progress, setProgress] = useState(70);
  const [length, setLength] = useState(true);
  const status = useSelector((state) => state.addblogs);

  const dispatch = useDispatch();
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
        toast.error("Deleted!!!", {
          position: "top-right",
          autoClose: 200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        removeDelete(!Delete);
      });
  };
  const update = (function2) => {
    setRef(function2);
    toast.success("ADDED!!!", { autoClose: 200 });
  };
  const Load = () => {
    setRelode((prev) => !prev);
    //   setTimeout(() => {
  //     setRelode(!function1)
  //   }, 1000);
  };
  console.log(relode);
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
        setEmpdatachange(result);
      } else {
        DisplayData();
      }
    }
  };
  
  useEffect(() => {
    dispatch(getData()).then(({payload}) => {
      setEmpdatachange(payload.data);
    })    
  }, [relode,Delete]);

  // const dummy =() => {
  //   dispatch(getData()).then(({payload}) => {
  //     setEmpdatachange(payload.data);
  //   })
  // }
  return (
    <div className="container my-3 ">
      <div className="card">
        <LoadingBar color="#0080FF" height="4px" progress={status.progress} />
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
              <HashLoader
                color="#08cef4"
                loading={status.loading}
                cssOverride={{
                  margin: "auto",
                }}
                size={50}
                speedMultiplier={1}
              />
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
                  <td>Author</td>
                  <td>Category</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody className="table-primary">
                {empdata.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>

                    <MDBNavbarLink>
                      <NavLink
                        to={`/viewmore/${item._id}`}
                        className="text-decoration-none"
                      >
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
          ) :   (
            <>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>check it out!</strong>
                </Alert>
              </Stack>
            </>
          ) }
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
