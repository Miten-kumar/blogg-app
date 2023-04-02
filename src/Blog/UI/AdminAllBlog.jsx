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

const DisplayData = (props) => {
  const [empdata, empdatachange] = useState([]);
  const [Data1, setData1] = useState({});
  const [ref, setref] = useState(true);
  const [Delete, removeDelete] = useState(true);
  const [relode, setrelode] = useState(true);
  const [progress, setProgress] = useState(70);

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
          autoClose: 5000,
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
        setProgress(100);
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
        <LoadingBar
          color="#35DEFF"
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
                {empdata &&
                  empdata.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>

                      <MDBNavbarLink href={`/viewmore/${item._id}`}>
                        <td>{item.name}</td>
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
                        />{" "}
                        <Tooltip id="my-tooltip" />
                      </td>
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
      </div>
    </div>
  );
};

export default DisplayData;
