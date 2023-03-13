import React, { useState } from 'react';
import { MDBInput ,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
} from 'mdb-react-ui-kit';

export default function App() {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <MDBBtn onClick={toggleShow}>EDIT</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBModalBody>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    // value={name}
                    // onChange={(e) => namechange(e.target.value)}
                    id="Name"
                    type="Name"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Category"
                    id="email"
                    // value={email}
                    // onChange={(e) => emailchange(e.target.value)}
                    type="category"
                  />{" "}
                  <MDBTextArea
                    label="Message"
                    id="textAreaExample"
                    rows={4}
                    // value={password}
                    // onChange={(e) => passwordchange(e.target.value)}
                  />
                </MDBModalBody>


            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}