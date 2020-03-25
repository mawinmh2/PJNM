import React from 'react';
import { MDBTable , MDBTableBody , MDBTableHead , MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, 
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem  } from 'mdbreact';
import { compile , abs , derivative } from 'mathjs';
import Headweb from "./Headweb";

class Newton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      fn : '',
      x : '',
      answer : '',
      row : [],
      column : [],
    
    };
    this.onClick = this.onClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  
  shouldComponentUpdate(nextProps,nextState){
     if(nextState.fn !== "" && nextState.x !==""){
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

  calculate(){
    //not calculate
    if(this.state.fn === "" && this.state.x ===""){
      console.log('not calculate');
    }
    //calculate
    else{
      console.log('calculating');
      var error , i = 1 , row = [];
      var x2 = null;
      var dif;
      var x = parseFloat(this.state.x);
      const eq = compile(this.state.fn);
      const column = [ 
        {
          label : '#',
          field : 'i',
          sort : 'asc',
        },
        {
          label : 'X',
          field : 'x',
          sort : 'asc',
        },
        {
          label : 'X new',
          field : 'x2',
          sort : 'asc',
        },
        {
          label : 'Error',
          field : 'error',
          sort : 'asc'
        }
      ];
      
      if(eq.evaluate({x:x})!==0){
        do{
          dif = derivative(this.state.fn,'x').toString()
          dif = compile(dif).evaluate({x:x})
            x2 = x - eq.evaluate({x:x})/dif;
            error = abs((x2 - x) / x2)*100;
            row.push({
              '#' : i,
              'X' : x,
              'X_new' : x2,
              'Error' : error
            });
            if(eq.evaluate({x:x2})!== 0){
              x = x2;
            }
            else{
              break;
            }
            i++;
        }while(error > 0.00001);
      }
      else{
        x2 = x;
      }
      this.setState({
        answer : 'Answer is ' + x,
        row : row,
        column : column
      })
    }
  }
  
  render() {
    return (
      <div>
        <header>
        <Headweb />
        </header>
        <br /><br />
        <br /><br />
        <br /><br />
        <center><h1 className="title h1 my-4">Newton Method</h1></center>
        <br /><br />
        <div className="row" >
        <div className="col-lg-8 col-md-10 mx-auto">
            <div name="calc">
            <div className="input-group-sm mb-3">
                <input onChange={this.handleInputChange} type="text" name="fn" className="form-control" placeholder="Enter Function " aria-label="Username" aria-describedby="basic-addon1" /><br />
                <input onChange={this.handleInputChange} type="text" name="x" className="form-control" placeholder="Enter X0 Value" aria-label="Username" aria-describedby="basic-addon1" /><br />
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

export default Newton;
