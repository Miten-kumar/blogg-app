import React from "react";
import { MDBDropdown, MDBPopover, MDBBtn } from "mdb-react-ui-kit";

export default function App(props) {
  console.log(props.logout);
  return (
    <MDBDropdown>
      <MDBPopover
        className="mx-2 rounded-circle"
        rounded
        color="info "
        btnChildren={props.props}
        placement="right"
      >
        <MDBBtn onClick={props.logout} className="rounded-circle" color="danger">
          Logout
        </MDBBtn>
      </MDBPopover>
    </MDBDropdown>
  );
}
