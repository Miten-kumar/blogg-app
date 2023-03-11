import React from "react";
import { MDBDropdown, MDBPopover, MDBBtn } from "mdb-react-ui-kit";

export default function App(props) {
  console.log(props.logout);
  return (
    <MDBDropdown>
      <MDBPopover
        className="mx-2"
        color="danger"
        btnChildren={props.props}
        placement="right"
      >
        <MDBBtn onClick={props.logout} color="transparent">
          Logout
        </MDBBtn>
      </MDBPopover>
    </MDBDropdown>
  );
}
