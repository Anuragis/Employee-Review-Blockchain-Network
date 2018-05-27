import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoginModal from './LoginModal';
import CustomNavbar from './CustomNavbar';

import CustomSlider from './CustomSlider';

const image6 = './6.jpg';
class Home extends Component{
    render(){
        return(
            <div>   
                <div className="col-md-12" style={{backgroundImage: 'linear-gradient(135deg,#006064 0%,#26C6DA 100%)',height:'46px'}}>
                        <div className="row" style={navstyle}>
                            <CustomNavbar />
                        </div>
                </div>

                {this.props.loginModal.isOpen && <LoginModal/>}

                <div>
                    <span style={titlestyle}>
                            <b>Welcome to Employee Review Blockchain Network </b>
                    </span> 
                </div>

                <div className="row" style={cslider}>
                     <CustomSlider />       
                </div>
            </div>
        )
    }
}

const navstyle={
    marginLeft:'120px',
    marginRight:'120px'
}

const cslider={
    marginLeft:'150px',
    marginRight:'150px',
    marginTop:"0px"
}

const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginLeft:"250px"
}

function mapStateToProps(state){
    return{
        loginModal:state.loginModal
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Home));
