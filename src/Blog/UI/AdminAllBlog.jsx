import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import Edit from "./Edit";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

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
import { Pagination } from "antd";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const DisplayData = (props) => {
  const [ref, setRef] = useState(true);
  const [dense, setDense] = useState(false);
  const [Delete, setDelete] = useState(true);
  const [relode, setRelode] = useState(false);
  const status = useSelector((state) => state.addblogs);
  const [sorted, setSorted] = useState({ sorted: "name", reversed: false });
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [pageCount, setPageCount] = useState(1);
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
      if (result) {
        setData(result);
      } else {
        dispatch(getData()).then(({ payload }) => {
          setData(payload.data);
        });
      }
    }
  };
  function Click(e) {
    console.log(e);
    const count = e;
    let data = {
      limit: limit,
      count: count,
    };
    console.log(data);
    dispatch(getData(data)).then(({ payload }) => {
      setData(payload.data.blogs);
      setPageCount(payload.data.totalpage);
    });
  }
  useEffect(() => {
    Click();
  }, [relode, Delete, ref]);
  function changeLimit() {
    setPageCount(1);
    Click();
  }

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#16B2DA",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  return (
    <div className="container my-3 ">
      <div className="card">
        <LoadingBar color="#0080FF" height="4px" progress={status.progress} />
        {/* ADD BUTTON................... */}
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
            className="form-check-label mt-4 d-grid"
            htmlFor="flexSwitchCheckChecked"
          >
            <FcAlphabeticalSortingAz fontSize={"30px"} />
          </label>

          <FormControlLabel
            className="mt-2 mx-0"
            control={
              <IOSSwitch sx={{ m: 1 }} checked={dense} onChange={sort} />
            }
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label" className="mt-3">
                Set Limit
              </InputLabel>
              <Select
                className="m-0 p-0  mt-3 "
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onBlur={changeLimit}
                value={limit}
                label="set Limit"
                onChange={(e) => setLimit(e.target.value)}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
            <Button className="mt-4 " variant="outlined">
              Set
            </Button>
          </Box>

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

                    <NavLink
                      to={`/viewmore/${item._id}`}
                      className="text-decoration-none m-0 p-0 mx-2"
                    >
                      <td>{item.name}</td>
                    </NavLink>
                    <td>
                      {item.email}
                      <span
                        className="float-end shadow text-success"
                        color="#45B39D"
                      >
                        {`:- ${item.userId.username}`}
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
            defaultCurrent={1}
            total={pageCount * 10}
            onChange={Click}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
