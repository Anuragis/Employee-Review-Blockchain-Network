import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import LoginModal from './LoginModal';
import CustomNavbar from './CustomNavbar';

import * as composerAPI from '../api/composerAPI'; 

class EmployeeDetails extends Component{

    componentWillMount(){
        // composerAPI.getEmployee()
        // .then(res)
    }

    createEmployeeData(){
        return(
            <div>
                <div className="row">
                    <span style={titlestyle}>
                        {this.props.userData.data.designation}
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        ID
                    </div>
                    <div className="col-md-9">
                    <div>{this.props.userData.data.ID}</div>
                           
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        First Name
                    </div>
                    <div className="col-md-9">
                        <div>{this.props.userData.data.firstName}</div>
                           
                    </div>      
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Last Name
                    </div>
                    <div className="col-md-9">
                    <div>{this.props.userData.data.lastName}</div>
                           
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Designation
                    </div>
                    <div className="col-md-9">
                    <div>{this.props.userData.data.designation}</div>
                           
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
            </div>
        )
    }

    render(){
        return(
            <div>   
                
                <div className="row">
                    
                        {this.createEmployeeData()}
            
                </div>   
            </div>
        )
    }
}

const navstyle={
    marginLeft:'120px',
    marginRight:'120px'
}

const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}
const itemstyle={
    height: '20px',
    marginBottom:'35px'
}
const labelstyle={
    fontWeight:'bold',
    color: '#333',
    fontSize:'14px',
}

function mapStateToProps(state){
    return{
        loginModal:state.loginModal,
        userData:state.userData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            
        }
        ,dispatch);
  }
  
export default connect(mapStateToProps,matchDispatchToProps)(EmployeeDetails);
