import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const { id, token } = useParams();
  
  console.log(token);
  console.log(id);
  const ForGotPassword = (e) => {
    e.preventDefault();
    const data = { password: password };
    console.log(data);
    axios
      .post(`http://localhost:5000/resetPassword/${id}/${token}`, data)
      .then((response) => {
        console.log("Status: ", response.status);
        console.log("Data: ", response.data);
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
        // alert("Somthng Went Wrong");
      });
  };
  return (
    <Container className="mt-5 w-50" bg="secondary">
      <Card border="info" className="p-4">
        <Form onSubmit={ForGotPassword}>
          {/* <Form.Group className="mb-3" controlId="formBasicPassword"> */}
          {/* <Form.Control type="email" placeholder="Enter Current password" /> */}
          {/* </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              placeholder="Enter New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted mx-2">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button variant="info" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Resetpassword;
