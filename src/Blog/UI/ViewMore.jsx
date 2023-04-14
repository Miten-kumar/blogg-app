import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";
import LoadingBar from "react-top-loading-bar";
import HashLoader from "react-spinners/HashLoader";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

const Users = () => {
  const [state, setState] = useState([]);
  const [reloade, setrelode] = useState(true);
  const [progress, setProgress] = useState(70);
  const [length, setLength] = useState(true);

  const params = useParams();

  // console.log(params._id);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getblogs/" + params._id)
      .then((response) => {
        // console.log(response["data"]);
        setState([response["data"]]);
        setProgress(100);
        setLength(false);
      });
  }, [reloade]);
  return (
    <div className="container my-2 mx-5 ">
      {/* <LoadingBar
        color="#00BFFF"
        height="3px"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <table className="table table-hover table-primary text-center">
        <HashLoader
          color="#08cef4"
          loading={length}
          cssOverride={{
            marginLeft: "15rem",
          }}
          size={70}
          speedMultiplier={1}
        />

        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> Author</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody> */}
      <LoadingBar
        color="#00BFFF"
        height="3px"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <HashLoader
        color="#08cef4"
        loading={length}
        cssOverride={{
          marginLeft: "15rem",
        }}
        size={70}
        speedMultiplier={1}
      />

      {state.map((elem, index) => {
        {/* const image64 = Buffer.from(elem.image, "base64"); */}
console.log(elem.image)
        return (
          <Row>
            <Col xs={5  } className="mt-3 mx-2 " >
              <Card border="info">
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${elem.image}`}
                  alt=""
                  className=""
                  height={"650px"}
                />
              </Card>
            </Col>
            <Card border="info" className="w-50 mt-3">
              <Col >
                <Card.Body >
                  <Card.Text> Name:- {elem.name}</Card.Text>
                  <Card.Text> Dec:- {elem.password}</Card.Text>
                  <Card.Footer>
                    <small className="text-muted">{elem.email}</small>
                  </Card.Footer>
                </Card.Body>
              </Col>
            </Card>
          </Row>

        );
      })}
      {/* </tbody> */}
      {/* </table> */}
    </div>
  );
};

export default Users;
