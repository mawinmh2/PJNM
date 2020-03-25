import React from 'react';
import { MDBTable , MDBTableBody , MDBTableHead , MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBMask, MDBView, 
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem  } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { compile , abs} from 'mathjs';
import Headweb from "./Headweb";

class False extends React.Component {
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

  calculate(){
    //not calculate
    if(this.state.fn === "" && this.state.x0 ==="" && this.state.x1 ===""){
      console.log('not calculate');
    }
    //calculate
    else{
      console.log('calculating');
      var error , i = 1 , row = [];
      var x2 = null;
      var x0 = parseFloat(this.state.x0);
      var x1 = parseFloat(this.state.x1);
      const eq = compile(this.state.fn);
      const column = [ 
        {
          label : '#',
          field : 'i',
          sort : 'asc',
        },
        {
          label : 'X0',
          field : 'x0',
          sort : 'asc',
        },
        {
          label : 'X1',
          field : 'x1',
          sort : 'asc',
        },
        {
          label : 'X2',
          field : 'x2',
          sort : 'asc',
        },
        {
          label : 'Error',
          field : 'error',
          sort : 'asc'
        }
      ];
      if(eq.evaluate({x:x0})*eq.evaluate({x:x1})<0){
        do{
            x2 = x1-eq.evaluate({x:x1})*(x0-x1)/(eq.evaluate({x:x0})-eq.evaluate({x:x1}));
            error = abs((x2 - x1) / x2)*100;
            row.push({
              '#' : i,
              'X0' : x0,
              'X1' : x1,
              'X2' : x2,
              'Error' : error,
            });
            if(eq.evaluate({x:x2}) === 0){
              break;
            }
            else{
              x0 = x1;
              x1 = x2
            }  
            i++;
        }while(error > 0.00001);
      }
      if( x2 === null){
        this.setState({
          answer : 'Answer is not in range of '+x0+' and '+x1,
          row : [],
          column : [], 
        })
      }
      else{
        this.setState({
          answer : 'Answer is ' + x2,
          row : row,
          column : column,
        })
      }
    }

  
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
        <center><h1 className="title h1 my-4">False Position</h1></center>
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

export default False;
