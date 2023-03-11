import React, { useState  } from "react";
import { NavLink } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBCollapse,
  MDBNavbarItem,
  MDBIcon,
  MDBBtn,
  MDBNavbarBrand
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import myimg from "./572.png";
import { FcHome } from "react-icons/fc";

export default function Navbar(props) {
  const Name = props.props.username.charAt(0);
  const firstLetter = Name.toUpperCase();
  console.log(props.props);

  // document.getElementById("loginbtn").innerHTML = firstLetter;



  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <MDBNavbar expand="lg" bgColor="light">
        <MDBNavbarBrand className="m-0 p-0">
          <img
            src={myimg}
            alt="Trees"
            width=" 91px"
            height="42px"
            style={{ borderRadius: "16px" }}
          />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          className="btn btn-outline-primary"
          aria-expanded="false"
          aria-label="Toggle navigation "
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBContainer fluid>
          <MDBCollapse navbar show={showNav}>
            <NavLink to="/">
              <FcHome
                className="mx-2 mb-2 mt-1"
                style={{ fontSize: "2rem", cursor: "pointer" }}
              />
            </NavLink>
            <MDBNavbarNav className="p-3 ">
              <MDBNavbarItem className="mx-2 mt-2">
                <NavLink to="/blog">Blogs</NavLink>
              </MDBNavbarItem>
              {props.props.isLogged === true ? (
                <MDBBtn className="mx-2 p-1 mb-1 fs-5" color="danger" tag="a" floating> 
                <b>{firstLetter}</b>
                  <MDBIcon id="loginbtn" fas icon="loginbtn" />
                </MDBBtn>
              ) : (
                <div className="d-flex ">
                  <MDBNavbarItem className="mx-2 mt-2">
                    <NavLink to="/register">Register</NavLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem className="mx-2 mt-2">
                    <NavLink to="/login">Login</NavLink>
                  </MDBNavbarItem>
                </div>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {/* Display json data .............................*/}
    </>
  );
}
