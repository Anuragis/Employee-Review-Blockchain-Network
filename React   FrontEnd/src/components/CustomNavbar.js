import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';
import CustomItem from './CustomItem';
import {loginModalOpen} from '../actions/loginModalAction';
import {logout} from '../actions/logoutAction';
const userVal = "User: ";
class CustomNavbar extends Component
{

    openLoginModal(){
        this.props.loginModalOpen();
    }

    signout(){
        this.props.history.push("/");
        this.props.logout();
    }
    
    render(){
        return(
            <div>
                
                <div className="row">
                {
                    !(this.props.userData.isLoggedIn) && 
                    <div>
                        <div className="col-lg-2 " onClick={()=>this.openLoginModal()}>
                            <CustomItem name="ReviewNet"/>
                        </div>
                        <div className="col-lg-2 col-md-offset-8" onClick={()=>this.openLoginModal()}>
                            <CustomItem name="Login"/>
                        </div>
                    </div>
                    
                }
                {
                    (this.props.userData.isLoggedIn) && 
                    <div>
                        <div className="col-lg-2 " style={{marginLeft:"0px"}} onClick={()=>this.openLoginModal()}>
                            <CustomItem name="ReviewNet"/>
                        </div>
                        <div className="col-lg-2 col-lg-offset-6" onClick={()=>this.signout()}>
                            <CustomItem name=   {this.props.userData.data.firstName + " " + this.props.userData.data.lastName}/>
                        </div>
                        <div className="col-lg-2 " onClick={()=>this.signout()}>
                            <CustomItem name="Sign Out"/>
                        </div>
                    </div>
                }
                    
                </div>
            </div>
        )
    }
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
            loginModalOpen,
            logout
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(CustomNavbar));

