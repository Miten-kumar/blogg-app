import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

function App() {
  const items = useSelector((state) => state.allCart.items);
  return (
    <div className="container">
      <Navbar />
      <MDBContainer fluid className="mt-5 ">
        <MDBRow className="justify-content-center">
          {items.map((item, key) => (
            <MDBCol md="12" lg="4" className="mb-4 " key={item.id}>
              <MDBCard style={{ borderRadius: "15px", border: "2px  " }}>
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image rounded  hover-zoom"
                >
                  <MDBCardImage
                    src={item.image}
                    fluid
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      width: "400px",
                      height: "400px",
                    }}
                  />
                  <a href="#!">
                    <div className="mask"></div>
                  </a>
                </MDBRipple>
                <MDBCardBody className="pb-0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p>
                        <a href="#!" className="text-dark">
                          {item.title}
                        </a>
                      </p>
                      <p className="small text-muted">{item.description}</p>
                    </div>
                  </div>
                </MDBCardBody>
                <hr class="my-0" />
                <MDBCardBody className="pb-0">
                  <div className="d-flex justify-content-between">
                    <p>
                      <a href="#!" className="text-dark">
                        $ {item.price}
                      </a>
                    </p>
                    <div className=" text-danger ">
                      <MDBIcon fas icon="star " />
                      <span className="mx-2">{item.rating.rate}/5</span>
                    </div>
                    <p className="text-dark">{item.category}</p>
                  </div>
                </MDBCardBody>
                <hr class="my-0" />
                <MDBCardBody className="pb-0">
                  <div className="d-flex  justify-content-between align-items-center  mb-4">
                    <a href="#!" className="text-dark  fw-bold">
                      Cancel
                    </a>
                    <MDBBtn outline color="danger">
                      ADD
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;
