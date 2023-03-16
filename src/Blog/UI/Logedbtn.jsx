import React from "react";
import { MDBDropdown, MDBPopover, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Tooltip } from "@mui/material";
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
      <Tooltip title="LOGOUT" arrow>
        <MDBBtn onClick={props.logout} className="rounded p-2" color="danger">
        <ExitToAppIcon/>
        </MDBBtn>
        </Tooltip>
        <Tooltip title="INFO" arrow>
        <MDBBtn onClick={Details} className="p-2 mx-2" color="info">
          
        <InfoIcon/> 
        </MDBBtn>
        
        </Tooltip>
      </MDBPopover>
    </MDBDropdown>
  );
}
