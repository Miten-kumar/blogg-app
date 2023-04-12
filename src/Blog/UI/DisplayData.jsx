import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import { Form } from "react-bootstrap";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Input } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { MDBNavbarLink } from "mdb-react-ui-kit";
import LoadingBar from "react-top-loading-bar";
import { NavLink } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { useSelector, useDispatch } from "react-redux";
import { getUserData, getData } from "./Store/UserSlice";
import Pagination from "./Pagination";
import axios from "axios";
import { FcAlphabeticalSortingAz } from 'react-icons/fc';

const DisplayData = (props) => {
  const [empdata, setEmpdatachange] = useState([]);
  const [user, setUser] = useState([]);
  const [relode, setRelode] = useState(false);
  const [postPerPage] = useState(4);
  const [dense, setDense] = useState(false);
  const [currentpage, setcurrentPage] = useState(1);
  const status = useSelector((state) => state.addblogs);
  const [sorted, setSorted] = useState({ sorted: "name", reversed: false });
  const dispatch = useDispatch();
  const Load = () => {
    setRelode((prev) => !prev);
  };
  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:5000/search/${props.props.userId}/${key}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("login-auth")
            )}`,
          },
        }
      );
      result = await result.json();
      var data = [];
      if (result) {
        setEmpdatachange(result);
        data = empdata.slice(indexofFirstPage, indexofLastPage);
      } else {
        dispatch(getUserData(props.props.userId)).then(({ payload }) => {
          setEmpdatachange(payload.data);
          data = empdata.slice(indexofFirstPage, indexofLastPage);
        });
      }
    }
  };

  useEffect(() => {
    props.props.isLogged === true || props.props.isLoged === true
      ? dispatch(getUserData(props.props.userId)).then(({ payload }) => {
          setEmpdatachange(payload.data);
        })
      : dispatch(getData()).then(({ payload }) => {
          setEmpdatachange(payload.data);
        });
    axios.get("http://localhost:5000/get").then((response) => {
      console.log(response["data"]);
      setUser([...response["data"]]);
    });
  }, [relode]);
  const indexofLastPage = postPerPage * currentpage;
  const indexofFirstPage = indexofLastPage - postPerPage;
  const data = empdata.slice(indexofFirstPage, indexofLastPage);

  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber);
  };
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
  return (
    <div className="container my-3  ">
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
              </Form> <label
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
            <div className="card-body">
              {data && data.length > 0 ? (
                <table className="table table-bordered ">
                  <thead className="table table-hover table-primary text-center ">
                    <tr>
                      <td>No.</td>
                      
                      <td  onClick={sort} checked={!dense}> Title</td>
                      <td>category</td>
                    </tr>
                  </thead>
                  <tbody className="table-primary ">
                    {data &&
                      data.map((item, index) => (
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
                          <td>{item.email} </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : status.loading === false ? (
                <>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      No Record Found — <strong>check it out!</strong>
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
          </>
        ) : (
          <>
          <div className="d-flex mx-3">
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
            <div className="card-body">
              {data.length > 0 ? (
                <table className="table table-bordered ">
                  <thead className="table table-hover table-primary text-center">
                    <tr>
                      <td>No.</td>
                      <td  onClick={sort} checked={!dense}> Title</td>
                      <td>category</td>
                    </tr>
                  </thead>
                  <tbody className="table-primary">
                    {data &&
                      data.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <MDBNavbarLink href={`/viewmore/${item._id}`}>
                            <td>{item.name}</td>
                          </MDBNavbarLink>
                          <td>
                            {item.email}
                            <span className="float-end shadow " color="#45B39D">
                              {
                               ` :- ${user.filter(
                                  (user) => user._id === item.userId
                                )[0].username} `
                              }
                            </span>
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
                      No Record Found— <strong>check it out!</strong>
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
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayData;
