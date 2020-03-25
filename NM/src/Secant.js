import React from 'react';
import { MDBTable , MDBTableBody , MDBTableHead , MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBMask, MDBView, 
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem  } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
//import { compile , abs} from 'mathjs';
import axios from "axios";
import Headweb from "./Headweb";

class Secant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      fn : '',
      x0 : '',
      x1 : '',
      answer : '',
      row : [],
      column : [],
    
    };
    this.onClick = this.onClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  
  shouldComponentUpdate(nextProps,nextState){
    //  console.log("fn : "+nextState.fn);
    //  console.log("x0 : "+nextState.x0);
    //  console.log("x1 : "+nextState.x1);
     if(nextState.fn !== "" && nextState.x0 !=="" && nextState.x1 !==""){
        return true
      }
      else{
        return false
      }
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  onConfirm(){
    this.setState({output:[],});
    this.cal();
  }

  calculate(){
    axios.post("http://localhost:8000/secantapi/Secantapi", {
     xiold :parseFloat(this.state.X0),
     xi :parseFloat(this.state.X1),
     equation: this.state.equation
    },console.log('callapi'))
    .then(res => {
      this.setState({result:res.data.result})
        console.log(this.state.result)
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  
  
  render() {
    console.log(this.state.fn);
    console.log(this.state.x0);
    console.log(this.state.x1);
    console.log(this.state.answer);
    return (
      <div>
        <header>
        <Headweb />
        </header>
        <br /><br />
        <br /><br />
        <br /><br />
        <center><h1 className="title h1 my-4">Secant Method</h1></center>
        <br /><br />
        <div className="row" >
        <div className="col-lg-8 col-md-10 mx-auto">
            <div name="calc">
            <div className="input-group-sm mb-3">
                <input onChange={this.handleInputChange} type="text" name="fn" className="form-control" placeholder="Enter Function " aria-label="Username" aria-describedby="basic-addon1" /><br />
                <input onChange={this.handleInputChange} type="text" name="x0" className="form-control" placeholder="Enter X0 Value" aria-label="Username" aria-describedby="basic-addon1" /><br />
                <input onChange={this.handleInputChange} type="text" name="x1" className="form-control" placeholder="Enter X1 Value" aria-label="Username" aria-describedby="basic-addon1" /><br />
            </div>
            <center >
                <button onClick={this.calculate} className="btn btn-outline-secondary">Calculate</button>
                <br /><br /><br />
                <p className="">{this.state.answer}</p>   
                <MDBTable btn>
                  <MDBTableHead columns={this.state.column} />
                  <MDBTableBody rows={this.state.row} />
                </MDBTable>
            </center>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Secant;
