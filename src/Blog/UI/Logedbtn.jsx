import React from "react";
import { MDBDropdown, MDBPopover } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { BsInfoSquare } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { IoIosLogOut } from "react-icons/io";
import "react-tooltip/dist/react-tooltip.css";
export default function App(props) {
  const Navigate = useNavigate();
  const Details = () => {
    Navigate("/details");
  };

  // console.log(props.logout);
  return (
    <MDBDropdown>
      <MDBPopover
        className="mx-2 "
        rounded-5
        color="info "

        // style={{ padding: "10px 15px 6px ", "font-size": "18px" }}
        btnChildren={props.props}
        placement="right"
      >
        <IoIosLogOut
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Loged off"
          data-tooltip-variant="warning"
          onClick={props.logout}
          cursor={"pointer"}
          className="mx-2"
          fontSize={"35px"}
          color="#CB4335"
        />

        <Tooltip id="my-tooltip" />
        <BsInfoSquare
          data-tooltip-id="my-info"
          data-tooltip-content="More Details"
          data-tooltip-variant="info"
          onClick={Details}
          cursor={"pointer"}
          className="mx-2"
          fontSize={"30px"}
          color="#45B39D"
        />
        <Tooltip id="my-info" />
      </MDBPopover>
    </MDBDropdown>
  );
}
