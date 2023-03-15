import React from "react";
import { MDBDropdown, MDBPopover, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function  App(props) {
  const Navigate= useNavigate()
  const Details = () => {
    Navigate('/details')
  }
  
  // console.log(props.logout);
  return (
    <MDBDropdown>
      <MDBPopover
        className="mx-2 "
        rounded
        color="info "
        style={{"font-family": 'FontAwesome',"padding": "8px 18px 11px 19px"}} 
        btnChildren={props.props}
        placement="right"
      >
        <MDBBtn onClick={props.logout} className="rounded" color="danger">
          Logout
        </MDBBtn>
      
        <MDBBtn onClick={Details} className="rounded mx-2" color="info">Details</MDBBtn>
      </MDBPopover>
    </MDBDropdown>
  );
}
