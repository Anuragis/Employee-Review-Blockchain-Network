import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoginModal from './LoginModal';
import CustomNavbar from './CustomNavbar';

import * as composerAPI from '../api/composerAPI';
import RaisedButton from 'material-ui/RaisedButton';

import {quickAnalysis} from '../actions/quickAnalysis';
class ReviewHistory extends Component{

    constructor(props){
        super(props);
        this.state={
         reviewHistory:[]
        }
    }

    componentWillMount(){
        
        var url  = "queries/selectReviewByEmployee?employee=resource%3Aorg.sjsu.reviewnet.Employee%23"+ this.props.currentEmployee.ID;
        
        composerAPI.getReviewHistory(url)
        .then(res=>{
            if(res.status === 200){
                res.json().then(data=>{
                    console.log("i got :"+JSON.stringify(data));
                    this.setState({...this.state,reviewHistory:data});
                    this.props.quickAnalysis(data);
                })
            }
        })
    }

    showQuickAnalysis(){
        this.props.history.push("/reviewer/quick-analysis");
    }

    createReviewHistory(){
        return this.state.reviewHistory.map((review) => {
            return(
                <div>
                
                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Review
                        </div>
                        <div className="col-md-9">
                            {review.reviewID}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Reviewer ID
                        </div>
                        <div className="col-md-9">
                            {review.reviewerID}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Rating
                        </div>
                        <div className="col-md-9">
                            {review.rating}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Term
                        </div>
                        <div className="col-md-9">
                            {review.term}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Year
                        </div>
                        <div className="col-md-9">
                            {review.year}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Comments
                        </div>
                        <div className="col-md-9">
                            {review.comments}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Awards
                        </div>
                        <div className="col-md-9">
                            {review.awards}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Warnings
                        </div>
                        <div className="col-md-9">
                            {review.warnings}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Project ID
                        </div>
                        <div className="col-md-9">
                            {review.project.projectID}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Project Name
                        </div>
                        <div className="col-md-9">
                            {review.project.projectName}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Project Owner
                        </div>
                        <div className="col-md-9">
                            {review.project.projectOwner}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Major Impact
                        </div>
                        <div className="col-md-9">
                            {review.project.majorImpact}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Project Comments
                        </div>
                        <div className="col-md-9">
                            {review.project.projectComments}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Record Type
                        </div>
                        <div className="col-md-9">
                            {review.record.type}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Level
                        </div>
                        <div className="col-md-9">
                            {review.record.level}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Description
                        </div>
                        <div className="col-md-9">
                            {review.record.description}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Action Taken
                        </div>
                        <div className="col-md-9">
                            {review.record.actionTaken}
                        </div>   

                    </div>

                    <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle}>
                            Employee
                        </div>
                        <div className="col-md-9">
                            {review.employee}
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
                        Review History of {this.props.currentEmployee.firstName + " " + this.props.currentEmployee.lastName}
                    </span> 
                    <span>
                        <RaisedButton primary={true} style={{marginBottom:"40px",marginLeft:"200px",width:"200px"}} onClick={()=>this.showQuickAnalysis()}>
                            Show Quick Analysis
                        </RaisedButton>
                    </span>
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>   
                    <br/>  
                    {this.createReviewHistory()}
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
    marginBottom:'5px'
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
        loginModal:state.loginModal,
        currentEmployee:state.currentEmployee
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            quickAnalysis
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(ReviewHistory));
