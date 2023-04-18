import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import Edit from "./Edit";
import { Form } from "react-bootstrap";
import { Input } from "@mui/material";
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
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios  from 'axios';

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
      let result = await axios.get(
        `http://localhost:5000/search/${props.props.userId}/${key}`,
      );
      console.log(result);
      if (result) {
        setData(result.data);
      } else {
        <h2>No record Found</h2>
        // dispatch(getUserData(props.props.userId)).then(({ payload }) => {
        //   setData(payload.data);
        // });
      }
    }else{
      let data = {
        limit: 3,
        count: 1,
        userId: props.props.userId,
      };
      // console.log(data);
      dispatch(getUserData(data)).then(({ payload }) => {
        setData(payload.data.blogs);
        setPageCount(payload.data.totalpage);
      });
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
    // console.log(props.props.userId);
    // console.log(e);
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
  function changeLimit() {
    setPageCount(1);
    UserClick();
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
              <Form className="w-25 mt-4 ">
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
        
      {/* print data........................... */}
        

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
                    <NavLink to={`/viewmore/${item._id}`} className="text-decoration-none m-0 p-0 mx-2">
                            <td>{item.name}</td>
                          </NavLink>
                    <td>{item.email}</td>
                    <td><div className="d-flex justify-content-center">

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
                    </div>
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
