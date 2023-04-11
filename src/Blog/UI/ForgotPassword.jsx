import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [Show, setShow] = useState(false);
  const ForGotPassword = (e) => {
    e.preventDefault();

    const data = { email: email };
    console.log(data);
    axios
      .post("http://localhost:5000/forgotPassword", data)
      .then((response) => {
        setShow(!Show);
        console.log("Status: ", response.status);
        console.log("Data: ", response.data);

        // alert("ok")
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
        alert("Somthng Went Wrong");
      });
  };

  return (
    <Container className="mt-5 w-50" bg="secondary" >
        <Alert show={Show} variant="success" dismissible onClose={() => setShow(false)}>
   
          <Alert.Heading>Email Sent Successfully!!</Alert.Heading>
     
        </Alert>
      <Card border="info" className="p-4">
        <Form onSubmit={ForGotPassword}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
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

export default Forgotpassword;
