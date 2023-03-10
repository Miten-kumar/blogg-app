import React, { useState } from "react";
import {
  MDBContainer,MDBNavbar, MDBNavbarToggler,MDBNavbarNav, MDBCollapse,} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import myimg from "./572.png";
import Register from "./Ragister";
import Login from "./Login";
import AddBlog from "./AddBlog";
import DisplayData from "./DisplayData"
import { FcHome } from "react-icons/fc";

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [LogedIn , setLogedIn] = useState()
  const status = (Data) =>{
    console.log(Data);
    setLogedIn(Data)
  }
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="secondary">
        <MDBContainer fluid>
          <img
            src={myimg} alt="Trees"  width=" 91px" height="42px"  style={{ borderRadius: "16px" }}
          />
          <MDBNavbarToggler
            type="button"   aria-expanded="false"  aria-label="Toggle navigation"  onClick={() => setShowNav(!showNav)}
          ></MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
              <FcHome className="mx-4 mb-2"   style={{fontSize:"28px",cursor:"pointer"}}/>
            <MDBNavbarNav>
              
              {/* add blog modal....................... */}
              <AddBlog />
              {
                !LogedIn === 'undefined' || !LogedIn === true ? 
              <>
              <Login props={status}/>
              <Register/>
              </> : null
              }

            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {/* Display json data .............................*/}
      <DisplayData/>
    </>
  );
}
