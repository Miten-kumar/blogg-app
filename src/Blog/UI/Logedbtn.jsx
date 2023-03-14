import React from "react";
import { MDBDropdown, MDBPopover, MDBBtn } from "mdb-react-ui-kit";

export default function App(props) {
  // console.log(props.logout);
  return (
    <MDBDropdown>
      <MDBPopover
        className="mx-2 rounded-circle"
        rounded
        color="info "
        
        style={{"font-family": 'FontAwesome',"padding": "8px 18px 11px 19px"}} 
        btnChildren={props.props}
        placement="right"
      >
        <MDBBtn onClick={props.logout} className="rounded" color="danger">
          Logout
        </MDBBtn>
      </MDBPopover>
    </MDBDropdown>
  );
}
