import React from 'react';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';

export default function Navbar() {
  return (
    <div class="sticky-top">
    <MDBNavbar light data-mdb-sticky-position="top"  bgColor='light'>
      <MDBContainer tag="form" fluid  className='justify-content-end  '>
        <MDBBtn  color="danger" className='me-2' type='button'>
          View Cart<AddShoppingCartTwoToneIcon fontSize="small" color="danger" />
        </MDBBtn>
        
      </MDBContainer>
    </MDBNavbar>
    </div>
  );
}