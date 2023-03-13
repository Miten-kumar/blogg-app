import { useEffect, useState } from "react";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
const EmpListing = (props) => {
  // const navigate = useNavigate();
  const [empdata, empdatachange] = useState(null);
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  //   const LoadEdit = (id) => {
  //     navigate("/employee/edit/" + id);
  // }
  useEffect(() => {
    fetch("http://localhost:8000/User")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container my-3  border ">
      <div className="card">
        {/* aDD BUTTON................... */}

        <div className="card-body ">
          <table className="table table-bordered  ">
            <thead className="bg-dark text-white ">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="table-primary">
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>

                    <td>
                      <button onClick={toggleShow} className="btn btn-success">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Modal title</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <button>Admin</button>
                  <button>User</button>
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={toggleShow}>
                    Close
                  </MDBBtn>
                  <MDBBtn>Save changes</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
