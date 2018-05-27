import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import { ListItem } from 'material-ui/List';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import Cancel from 'material-ui/svg-icons/navigation/cancel';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import * as API from '../api/composerAPI';
import {currentEmployee} from '../actions/currentEmployee';

import {
    
    red300,
    fullWhite
  
  } from 'material-ui/styles/colors';
class EmployeeList extends Component{

    constructor(props){
        super(props);
        this.state={
            employeeList:[]
        }

    }
    
    getAllEmployees(){
        API.getEmployee()
        .then(res=>{
           if(res.status === 200){
               res.json().then(employee => {
                    console.log(employee);
                    this.setState({...this.state,employeeList:employee})
               })
           }
        })
    }
    
    addReview(employee){
        this.props.currentEmployee(employee);
        this.props.history.push("/reviewer/add-review")
    }

    showReviewHistory(employee){
        this.props.currentEmployee(employee);
        this.props.history.push("/reviewer/show-history");
    }

    componentWillMount(){
        this.getAllEmployees();
    }

    onEmployeeClick(employee){
        // this.props.adminCurrentUpdate(car);
        // this.props.history.push("/adminUpdateCar");
    }

    

    createEmployeeList(){
        return this.state.employeeList.map((employee) => {
            if(employee.ID !== "initial"){
                return(
                    <div className="row">
                        <div className="col-md-8">
                            <ListItem disabled={true} style={{height:"60px"}}>
                                <div className="col-md-3">
                                    {employee.ID}
                                </div>
                                <div className="col-md-3">
                                    {employee.firstName}
                                </div>
                                <div className="col-md-3">
                                    {employee.lastName}
                                </div>
                                <div className="col-md-3">
                                    {employee.designation}
                                </div>
                            </ListItem>
                        </div>
                        <div className="col-md-1">
                            <RaisedButton primary={true} style={{marginTop:"10px"}} onClick={()=>this.addReview(employee)}>
                                Add Review
                            </RaisedButton>
                        </div>
                        <div className="col-md-2">
                            <RaisedButton primary={true} style={{marginTop:"10px"}} onClick={()=>this.showReviewHistory(employee)}>
                                Show Review History
                            </RaisedButton>
                        </div>
                       
                    </div>
                )
            }
            
        });
    }
    
    render(){
        return(
            <div>
                <span style={titlestyle}>
                        Employee List 
                </span> 
                <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'100%',marginTop:'7px',marginLeft:'0px'}}/>  
                
                
                <div>
                    
                        <div className="row" style={{"color":"white",fontSize:"20px"}}> 
                            <div className="col-md-8">
                                <ListItem disabled={true} style={{height:"45px","backgroundColor":"#BDBDBD"}}>
                                    <div className="col-md-3">
                                        ID
                                    </div>
                                    <div className="col-md-3">
                                        First Name
                                    </div>
                                    <div className="col-md-3">
                                        Last Name
                                    </div>
                                    <div className="col-md-3">
                                        Designation
                                    </div>
                                </ListItem>
                            </div>
                        </div>
                </div>
                <Divider/>
                <Divider/>
                {this.createEmployeeList()}
            </div>
        )
    }
}

const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}

const smallIcon= {
    width: 20,
    height: 20,
  }
const small={
    width: 20,
    height: 20,
}

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminCars:state.adminCars,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            currentEmployee
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(EmployeeList));
