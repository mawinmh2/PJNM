import React from 'react';
import { MDBTable , MDBTableBody , MDBTableHead , MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBMask, MDBView, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { compile , abs} from 'mathjs';
import Headweb from "./Headweb";

class Bisection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      fn : '',
      xl : '',
      xu : '',
      answer : '',
      row : [],
      column : []

    };
    this.onClick = this.onClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  
  shouldComponentUpdate(nextProps,nextState){
    //  console.log("fn : "+nextState.fn);
    //  console.log("xl : "+nextState.xl);
    //  console.log("xu : "+nextState.xu);
     if(nextState.fn !== "" && nextState.xl !=="" && nextState.xu !==""){
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
    if(this.state.fn === "" && this.state.xl ==="" && this.state.xu ===""){
      console.log('not calculate');
    }
    //calculate
    else{
      console.log('calculating');
      var error , i = 1 , row = [];
      var xm = null;
      var xl = parseFloat(this.state.xl);
      var xu = parseFloat(this.state.xu);
      const eq = compile(this.state.fn);
      const column = [ 
        {
          label : '#',
          field : 'i',
          sort : 'asc',
        },
        {
          label : 'Xl',
          field : 'xl',
          sort : 'asc',
        },
        {
          label : 'Xu',
          field : 'xu',
          sort : 'asc',
        },
        {
          label : 'Xm',
          field : 'xm',
          sort : 'asc',
        },
        {
          label : 'Error',
          field : 'error',
          sort : 'asc'
        }
      ];
      if(eq.evaluate({x:xl})*eq.evaluate({x:xu})<0){
        do{
            xm = (xl+xu)/2;
            error = abs((xm - xu) / xm)*100;
            row.push({
              '#' : i,
              'Xl' : xl,
              'Xu' : xu,
              'Xm' : xm,
              'Error' : error
            });
            if(eq.evaluate({x:xl})*eq.evaluate({x:xm})<0){
              xu = xm;
            }
            else if(eq.evaluate({x:xl})*eq.evaluate({x:xm})>0){
              xl = xm;
            }
            else if(eq.evaluate({x:xl})*eq.evaluate({x:xm})===0){
              break;
            }     
            i++;
        }while(error > 0.00001);
      }
      if( xm === null){
        this.setState({
          answer : 'Answer is not in range of '+xl+' and '+xu,
          row : [],
          column : []
        })
      }
      else{
        this.setState({
          answer : 'Answer is ' + xm,
          row : row,
          column : column
        })
      }
      console.log(xm);
      console.log(row);
    }

  
  }
  
  render() {
    console.log(this.state.fn);
    console.log(this.state.xl);
    console.log(this.state.xu);
    console.log(this.state.answer);
    return (
      <div>
        <header>
        <Headweb />

        </header>
        <br /><br />
        <br /><br />
        <br /><br />
        <center><h1 className="title h1 my-4">Bisection</h1></center>
        <br /><br />
        <div className="row" >
        <div className="col-lg-8 col-md-10 mx-auto">
            <div name="calc">
            <div className="input-group-sm mb-3">
                <input onChange={this.handleInputChange} type="text" name="fn" className="form-control" placeholder="Enter Function " aria-label="Username" aria-describedby="basic-addon1" /><br />
                <input onChange={this.handleInputChange} type="text" name="xl" className="form-control" placeholder="Enter XL Value" aria-label="Username" aria-describedby="basic-addon1" /><br />
                <input onChange={this.handleInputChange} type="text" name="xu" className="form-control" placeholder="Enter XU Value" aria-label="Username" aria-describedby="basic-addon1" /><br />
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

export default Bisection;
