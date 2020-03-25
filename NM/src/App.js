import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView, MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Headweb from "./Headweb";

class FullPageIntroWithFixedNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      isOpen: false
    };
    this.onClick = this.onClick.bind(this);
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  
  render() {
    return (
      <div>
        <header>
        <Headweb />
          <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg">
            <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
              <h1>Numerical Method</h1>
              <br />
              <p></p>
            </MDBMask>
          </MDBView>
        </header>
        <br /><br />
      </div>
    );
  }
}

export default FullPageIntroWithFixedNavbar;
