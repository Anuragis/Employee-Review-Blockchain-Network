import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CryptoJS from 'crypto-js';

import {bindActionCreators, combineReducers} from 'redux';
import {connect} from 'react-redux';

import {loginModalOpen} from '../actions/loginModalAction';
import {loginModalDone} from '../actions/loginModalAction';

import {changeValue} from '../actions/loginAction.js';
import {changeUserData} from '../actions/userDataAction.js';
import {withRouter} from 'react-router-dom';
import * as API from '../api/API';

import {NotificationContainer, NotificationManager} from 'react-notifications';
class LoginModal extends React.Component {

    constructor(props){
        super(props);
        this.state = { errorEmailText: '',errorPasswordText:''}
    }

  handleOpen = () => {
    this.props.loginModalOpen();
  };

  handleClose = () => {
    this.props.loginModalDone();
  };

  handleLogin = (loginData) => {

    console.log("logindata :"+JSON.stringify(loginData));
    API.doLogin(loginData)
    .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
            console.log("Success");
            console.log(res);
            res.json().then(user => {
                this.props.changeUserData(user);

                console.log("user is :"+JSON.stringify(user));
                if(user.designation === "Employee"){
                    this.props.history.push("/employee/details");
                }
                else{
                    this.props.history.push("/reviewer/details");
                }
                // this.props.loginSuccess(user);
                NotificationManager.success("Welcome", "Login Successful", 2500, true);
                this.props.loginModalDone();
            });
    
        } else if (res.status === 401) {
            console.log("Fail");
            NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
            // this.props.history.push("/");
        } 
        else{
            NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
        }
    });
           
  }


  render() {
    
    return (
      <div>
        <Dialog
          
          modal={false}
          open={this.props.loginModal.isOpen}
          onRequestClose={this.handleClose}
          style={{width:"600px", marginLeft:"400px",marginTop:"-50px",maxHeight:'none'}}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={false}
        >
        <div style={{backgroundImage: 'linear-gradient(135deg,#006064 0%,#26C6DA 100%)',paddingTop:"20px"}}>
            <span style={titlestyle}>
                            Login
            </span>
            <br/> 
            
            <div class="loginMain" style={loginMainStyle}>    
                <input id="cPwX-username" type="text" name="ID"  placeholder="Username" style={emailStyle}
                    onChange={(event)=>
                    {event.persist();
                    this.props.changeValue(event);
                    
                    }}
                />      
                <input id="cPwX-password" type="password" name="password"  placeholder="Password" style={emailStyle}
                    onChange={(event)=>
                    {event.persist();
                    this.props.changeValue(event);
                    
                    }}
                />
                <button id="cPwX-submit"  type="submit" style={buttonStyle} onClick={()=> this.handleLogin(this.props.loginData)}>
                        <span class="">Sign in</span>
                </button>
            </div>
        </div>
        </Dialog>
        
      </div>
    );
  }
}

const signupButtonStyle = {
    padding: "0 10px",
    height: "28px",
    lineHeight: "28px",
    backgroundColor: "#fff",
    color: "#8b8b8e",
    borderRadius: "2px",
    overflow: "inherit",
    border: "none",
    outline: "none",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
}

const signUpTextStyle = {
    marginRight: "10px",
    cursor: "pointer",
    
}

const footerStyle={
    marginTop:'-50px',
    padding: "10px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e5",
    color: "#8b8b8e"
}

const forgotPasswordStyle = {
    textAlign: "right",
    fontSize: "12px",
    marginTop: "8px",
    display: "block",
    color: "#999",
    margin: "15px 0px"
}

const buttonStyle = {
    backgroundColor: "#545456",
    color: "#fff",
    borderRadius: "2px",
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16)",
    height: "42px",
    width: "100%",
    fontSize: "16px"
}

const loginMainStyle ={
    padding: "10px 80px 40px",
}

const emailStyle = {
    marginBottom: "15px",
    width: "100%",
    height: "2.4em",
    padding: ".3333333em .3333333em .3333333em .6em",
    border: "1px solid #c2c2c6",
    borderRadius: ".0666667em",
    fontFamily: "sans-serif",
    fontSize: "100%",
    lineHeight: "1.15",
}

const mainStyle= {
    fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
    fontWeight: "400",
    fontSize: "15px",
    lineHeight: "1.231",
    color: "#0f0f0f",
    webkitFontSmoothing: "antialiased"
}

const loginOrSeparatorStyle= {
    display: "inline-block",color: "#545456",
    backgroundColor: "#fff",
    padding: "0 5px"
}

const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px',
    marginLeft:"80px",
    color:"white",
    marginTop:"40px !important"
}

function mapStateToProps(state){
    return{
        loginModal:state.loginModal,
        loginData:state.loginData,
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            loginModalOpen,
            loginModalDone,
            changeValue,
            changeUserData,
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(LoginModal));


