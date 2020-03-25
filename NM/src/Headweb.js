import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
  
class Headweb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      isOpen: false
    };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  
  render() {
    return (      
        <div>
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand>
                <a href='/'><strong className="white-text">Numerical Method</strong></a>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                        <span className="mr-2">Roots of Equations</span>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                        <MDBDropdownItem href="/Bisection">Bisection</MDBDropdownItem>
                        <MDBDropdownItem href="/Secant">Secant Method</MDBDropdownItem>
                        <MDBDropdownItem href="/False">False Position</MDBDropdownItem>
                        <MDBDropdownItem href="/Newton">Newton Raphson</MDBDropdownItem>
                        <MDBDropdownItem href="/OP">One-Point Iterations</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
      </div>
    );
  }
}

export default Headweb;
