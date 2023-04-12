import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import Edit from "./Edit";
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
import { getData, deleteUserData } from "./Store/UserSlice";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import Pagination from "./Pagination";
import axios from "axios";
const DisplayData = (props) => {
  const [empdata, setEmpdatachange] = useState([]);
  const [user, setUser] = useState([]);
  const [ref, setRef] = useState(true);
  const [dense, setDense] = useState(false);
  const [Delete, setDelete] = useState(true);
  const [relode, setRelode] = useState(false);
  const status = useSelector((state) => state.addblogs);
  const [sorted, setSorted] = useState({ sorted: "name", reversed: false });
  const [postPerPage] = useState(4);
  const [currentpage, setcurrentPage] = useState(1);

  const sort = (event) => {
    const usersCopy = [...empdata];
    setDense(event.target.checked);
    usersCopy.sort((userA, userB) => {
      const fullNameA = `${userA.name} `;
      const fullNameB = `${userB.name} `;
      if (sorted.reversed) {
        return fullNameB.localeCompare(fullNameA);
      }
      return fullNameA.localeCompare(fullNameB);
    });
    setEmpdatachange(usersCopy);
    setSorted({ sorted: "name", reversed: !sorted.reversed });
  };

  const dispatch = useDispatch();
  const update = (function2) => {
    setRef(function2);
    toast.success("ADDED!!!", { autoClose: 200 });
  };
  const Load = () => {
    setRelode((prev) => !prev);
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/searchall/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("login-auth")
          )}`,
        },
      });
      result = await result.json();
      var data = [];
      if (result) {
        setEmpdatachange(result);
        data = empdata.slice(indexofFirstPage, indexofLastPage);
      } else {
        dispatch(getData()).then(({ payload }) => {
          setEmpdatachange(payload.data);
          data = empdata.slice(indexofFirstPage, indexofLastPage);
        });
      }
    }
  };

  useEffect(() => {
    dispatch(getData()).then(({ payload }) => {
      setEmpdatachange(payload.data);
    });
    axios.get("http://localhost:5000/get").then((response) => {
      console.log(response["data"]);
      setUser([...response["data"]]);
    });
  }, [relode, Delete, ref]);

  const indexofLastPage = postPerPage * currentpage;
  const indexofFirstPage = indexofLastPage - postPerPage;
  const data = empdata.slice(indexofFirstPage, indexofLastPage);

  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  return (
    <div className="container my-3 ">
      <div className="card">
        <LoadingBar color="#0080FF" height="4px" progress={status.progress} />
        {/* ADD BUTTON................... */}
        {props.props.isLogged === true || props.props.isLoged === true ? (
          <>
            <div className="d-flex">
              <AddBlog load={Load} props={props.props.userId} />
              <Form className=" mt-4 ">
                <Input
                  type="search"
                  startAdornment={<SearchOutlinedIcon />}
                  placeholder="serach..."
                  onChange={searchHandle}
                  aria-label="Search"
                ></Input>
              </Form>

              <label
                class="form-check-label mt-4  mx-2 d-grid"
                for="flexSwitchCheckChecked"
              >
                <FcAlphabeticalSortingAz fontSize={"30px"} />
              </label>
              <div class="form-check form-switch mt-4 mx-0 " size="lg">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  style={{ background: "lightblue" }}
                  id="flexSwitchCheckChecked"
                  checked={dense}
                  onChange={sort}
                />
              </div>

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
          {data.length > 0 ? (
            <table className="table table-bordered ">
              <thead className="table table-hover table-primary text-center">
                <tr>
                  <td>No</td>

                  <td onClick={sort} checked={!dense}>
                    Title
                  </td>

                  <td>Category</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody className="table-primary">
                {data.map((item, index) => (
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
                    <td>
                      {item.email}
                      <span className="float-end shadow text-success">
                        {` :- ${
                          user.filter((user) => user._id === item.userId)[0]
                            .username
                        } `}
                      </span>
                    </td>
                    <td>
                      <Edit
                        props={item}
                        data={update}
                        Myid={props.props.userId}
                      />
                      <RiDeleteBinLine
                        onClick={() => {
                          dispatch(deleteUserData(item._id));
                          setDelete(!Delete);
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
          ) : status.loading === false ? (
            <>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  No record found — <strong>check it out!</strong>
                </Alert>
              </Stack>
            </>
          ) : null}

          <Pagination
            data={empdata}
            postPerPage={postPerPage}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
