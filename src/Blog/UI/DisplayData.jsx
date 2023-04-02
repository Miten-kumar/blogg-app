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

const DisplayData = (props) => {
  const [empdata, empdatachange] = useState([]);
  const [relode, setrelode] = useState(true);
  const [progress, setProgress] = useState(70);
  const [length, setLength] = useState(false);
  const Load = (function1) => {
    setrelode(function1);
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
        DisplayData();
      }
    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/getblogs")
      .then((res) => {
        // setrelode(!relode);
        setProgress(100);
        setLength(true);
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [relode]);

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
            <div className="card-body">
              {empdata.length > 0 ? (
                <table className="table table-bordered ">
                  <thead className="table table-hover table-primary text-center">
                    <tr>
                      <td>No.</td>
                      <td> Autohor</td>
                      <td>category</td>
                    </tr>
                  </thead>
                  <tbody className="table-primary">
                    {empdata &&
                      empdata
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
                          </tr>
                        ))}
                  </tbody>
                </table>
              ) : (
                <>
                  <HashLoader
                    color="#08cef4"
                    loading
                    cssOverride={{
                      margin: "auto",
                    }}
                    size={100}
                    speedMultiplier={1}
                  />

                  
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="card-body">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayData;
