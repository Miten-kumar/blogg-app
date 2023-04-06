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
const DisplayData = (props) => {
  const [empdata, setEmpdatachange] = useState([]);
  const [relode, setRelode] = useState(false);

  const status = useSelector((state) => state.addblogs);
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

      if (result) {
        setEmpdatachange(result);
      } else {
        dispatch(getUserData(props.props.userId)).then(({ payload }) => {
          setEmpdatachange(payload.data);
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
  }, [relode]);

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
            <div className="card-body">
              {empdata && empdata.length > 0 ? (
                <table className="table table-bordered ">
                  <thead className="table table-hover table-primary text-center ">
                    <tr>
                      <td>No.</td>
                      <td> Autohor</td>
                      <td>category</td>
                    </tr>
                  </thead>
                  <tbody className="table-primary ">
                    {empdata &&
                      empdata.map((item, index) => (
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
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : status.loading === false ? (
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
          </>
        ) : (
          <>
            <div className="card-body">
              <HashLoader
                color="#08cef4"
                loading={status.loading}
                cssOverride={{
                  margin: "auto",
                }}
                size={100}
                speedMultiplier={1}
              />
              {empdata.length > 0 ? (
                <table className="table table-bordered ">
                  <thead className="table table-hover table-primary text-center">
                    <tr>
                      <td>No.</td>
                      <td> Name</td>
                      <td>category</td>
                    </tr>
                  </thead>
                  <tbody className="table-primary">
                    {empdata &&
                      empdata.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <MDBNavbarLink href={`/viewmore/${item._id}`}>
                            <td>{item.name}</td>
                          </MDBNavbarLink>
                          <td>{item.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : status.loading === false ? (
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
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayData;
