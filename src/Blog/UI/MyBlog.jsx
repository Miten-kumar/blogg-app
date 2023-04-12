import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import Edit from "./Edit";
import { Form } from "react-bootstrap";
import { Input } from "@mui/material";
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
import { useSelector, useDispatch } from "react-redux";
import { getUserData, deleteUserData } from "./Store/UserSlice";
import { Pagination } from "antd";
import { FcAlphabeticalSortingAz } from "react-icons/fc";

const Myblog = (props) => {
  const [relode, setRelode] = useState(false);
  const [ref, setref] = useState(true);
  const [Delete, setDelete] = useState(true);
  const [dense, setDense] = useState(false);

  const status = useSelector((state) => state.addblogs);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [pageCount, setPageCount] = useState(1);
  const [sorted, setSorted] = useState({ sorted: "name", reversed: false });

  const dispatch = useDispatch();

  const Load = () => {
    setRelode((prev) => !prev);
  };
  const update = () => {
    setref((prev) => !prev);
    toast.success("ADDED!!!", { autoClose: 200 });
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
        setData(result);
        console.log(data);
      } else {
        dispatch(getUserData(props.props.userId)).then(({ payload }) => {
          setData(payload.data);
          console.log(data);
        });
      }
    }
  };


  const sort = (event) => {
    const usersCopy = [...data];
    setDense(event.target.checked);
    usersCopy.sort((userA, userB) => {
      const fullNameA = `${userA.name} `;
      const fullNameB = `${userB.name} `;
      if (sorted.reversed) {
        return fullNameB.localeCompare(fullNameA);
      }
      return fullNameA.localeCompare(fullNameB);
    });
    setData(usersCopy);
    setSorted({ sorted: "name", reversed: !sorted.reversed });
  };
  const UserClick = (e) => {
    console.log(props.props.userId);
    console.log(e);
    const count = e;
    let data = {
      limit: limit,
      count: count,
      userId: props.props.userId,
    };
    // console.log(data);
    dispatch(getUserData(data)).then(({ payload }) => {
      setData(payload.data.blogs);
      setPageCount(payload.data.totalpage);
    });
  };
  useEffect(() => {
     UserClick()

  }, [ref, Delete, relode]);

  // console.log(empdata);

  return (
    <div className="container my-3 ">
      <div className="card">
        <LoadingBar color="#0080FF" height="4px" progress={status.progress} />

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
              </Form><label
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
          <> </>
        )}

        <div className="card-body ">
          {data.length > 0 ? (
            <table className="table table-bordered " id="dtBasicExample">
              <thead className="table table-hover table-primary text-center">
                <tr>
                  <td>No</td>
                  <td>Title </td>
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
                    <td>{item.email}</td>
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
          <Pagination
                defaultCurrent={1}
                total={pageCount * 10}
                onChange={UserClick}
              />
        </div>
      </div>
    </div>
  );
};

export default Myblog;
