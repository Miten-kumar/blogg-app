import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js.map";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Todo() {
  const [input, setinput] = useState("");
  const [password, setpassword] = useState("");
  const formSubmit = (e) => {
    e.preventDefault();
    // const element = {
    //   name: input,
    //   password: password,
    // };
    // console.log(element);
    // console.log(input);
    // console.log(password);
    document.getElementById("demoOne").innerHTML = input;
    document.getElementById("demoTwo").innerHTML = password;
  };
  return (
    <>
      <Container>
        <Form onSubmit={formSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setinput(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p id="demoOne"></p>
        <p id="demoTwo"></p>
      </Container>
    </>
  );
}

export default Todo;
