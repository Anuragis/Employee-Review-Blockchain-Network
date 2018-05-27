import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoginModal from './LoginModal';
import CustomNavbar from './CustomNavbar';

import * as composerAPI from '../api/composerAPI';

class Transaction extends Component{

    constructor(props){
        super(props);
        this.state={
         transactions:[]
        }
    }

    componentWillMount(){
        composerAPI.getReview()
        .then(res=>{
            if(res.status === 200){
                res.json().then(data=>{
                    console.log("i got :"+JSON.stringify(data));
                    this.setState({...this.state,transactions:data});
                })
            }
        })
    }

    createTransactionData(){
        return this.state.transactions.map((transaction) => {
            return(
                <div>
                    
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Review
                            </div>
                            <div className="col-md-9">
                                {transaction.review}
                            </div>   
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Reviewed Employee
                            </div>
                            <div className="col-md-9">
                                {transaction.reviewedEmployee}
                            </div>   
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Transaction ID
                            </div>
                            <div className="col-md-9">
                                {transaction.transactionId}
                            </div>   
                        </div>

                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Transaction Time
                            </div>
                            <div className="col-md-9">
                                {transaction.timestamp}
                            </div>   
                        </div>
                                
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>  
                    
                </div>
            )
        });
    }

    render(){
        return(
            <div>   
                <div className="row">
                    <span style={titlestyle}>
                        Transactions
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>   
                    <br/>  
                    {this.createTransactionData()}
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

const labelstyle1={
    fontWeight:'bold',
    color: '#333',
    fontSize:'14px',
    marginTop:"10px"
}

const fdropdownStyle = {
    customWidth: {
      width: 300,
      marginBottom:'45px',
      paddingLeft:"0px"
    },
  };

const inputstyle={
    width: '296px',
    height: '32px',
    marginTop:'-10px'
}
const bstyle={
    fontSize:'16px',
    fontWeight:'400px',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontWeight:'bold'
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
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Transaction));
