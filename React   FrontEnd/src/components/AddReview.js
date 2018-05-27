import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import LoginModal from './LoginModal';
import CustomNavbar from './CustomNavbar';

import * as composerAPI from '../api/composerAPI'; 
import * as API from '../api/API';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ReactStars from 'react-stars';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { NotificationManager } from 'react-notifications';

const term_types=[
    {
        "name":"midYear"
    },
    {
        "name":"yearEnd"
    },
    {
        "name":"NA"
    }
];

const record_types = [
    {
        "name":"complaint"
    },
    {
        "name":"longLeaves"
    },
    {
        "name":"policyVoilation"
    },
    {
        "name":"healthIssue"
    },
    {
        "name":"other"
    }
];

const record_levels = [
    {
        "name":"high"
    },
    {
        "name":"critical"
    },
    {
        "name":"medium"
    },
    {
        "name":"minor"
    },
    {
        "name":"NA"
    }
]

const review_types = [
    {
        "name":"Complete"
    },
    {
        "name":"Project"
    },
    {
        "name":"Incidents and Records"
    },
]

const termTypes = [];

term_types.map(type=>{
    termTypes.push(<MenuItem value={type.name} key={type.name} primaryText={type.name} />);
});

const recordTypes = [];
record_types.map(type=>{
    recordTypes.push(<MenuItem value={type.name} key={type.name} primaryText={type.name} />);
});

const recordLevels = [];
record_levels.map(type=>{
    recordLevels.push(<MenuItem value={type.name} key={type.name} primaryText={type.name} />);
});

const reviewTypes = [];
review_types.map(type=>{
    reviewTypes.push(<MenuItem value={type.name} key={type.name} primaryText={type.name} />);
});


class AddReview extends Component{

    constructor(props){
        super(props);
        this.state={
        
            "$class": "org.sjsu.reviewnet.Review",
            "reviewID": "",
            "reviewerType": this.props.userData.data.designation,
            "reviewerID": this.props.userData.data.ID,
            "ratingValue": "0",
            "rating":"NA",
            "term": "NA",
            "year": "NA",
            "comments": "NA",
            "awards": "NA",
            "warnings": "NA",
            "project": {
                "$class": "org.sjsu.reviewnet.projectReview",
                "projectID": "NA",
                "projectName": "NA",
                "projectOwner": "NA",
                "majorImpact": "NA",
                "projectComments": "NA",
                "id": ""
            },
            "record": {
                "$class": "org.sjsu.reviewnet.incidentRecord",
                "type": "other",
                "level": "NA",
                "description": "NA",
                "actionTaken": "NA",
                "id": ""
            },
            "employee": {},
            "reviewType":"Complete"
            }
    }

    componentWillMount(){
        API.getReviewID()
        .then(res=>{
            res.json().then(data=>{
                console.log("Id :"+data.reviewID);
                this.setState({...this.state,reviewID:data.reviewID});
                this.setState({...this.state,project:{...this.state.project,id:data.reviewID}});
                this.setState({...this.state,record:{...this.state.record,id:data.reviewID}});
            })
        })
    }

    handleReviewTypeChange = (event, index,value) => {
        this.setState({...this.state,reviewType:value});
    };
        
    handleRatingChange = (value) => {
        var ratingValue = Math.round(value);
        
        var rating;
        if(ratingValue === 1){
            rating="poor";
        }
        else if(ratingValue === 2){
            rating="average";
        }
        else if(ratingValue === 3){
            rating="good";
        }
        else if(ratingValue === 4){
            rating="excellent";
        }
        else{
            rating="top";
        }
        console.log("value is: "+rating);
        this.setState({...this.state,rating:rating},function(){
            this.setState({...this.state,ratingValue:ratingValue});
        })
        
      };

    handleTermChange = (event, index, value) => {
        this.setState({...this.state,term:value});
    };

    handleRecordTypeChange = (event, index, value) => {
        this.setState({...this.state,record:{...this.state.record,type:value}});
    };

    handleRecordLevelChange = (event, index, value) => {
        this.setState({...this.state,record:{...this.state.record,level:value}});
    };

    handleYearChange(event){
        this.setState({...this.state,year:event.target.value})
    }

    handleCommentsChange(event){
        this.setState({...this.state,comments:event.target.value})
    }

    handleAwardsChange(event){
        this.setState({...this.state,awards:event.target.value})
    }

    handleWarningsChange(event){
        this.setState({...this.state,warnings:event.target.value})
    }
    handleProjectIDChange(event){
        this.setState({...this.state,project:{...this.state.project,projectID:event.target.value}})
    }

    handleProjectNameChange(event){
        this.setState({...this.state,project:{...this.state.project,projectName:event.target.value}})
    }

    handleProjectOwnerChange(event){
        this.setState({...this.state,project:{...this.state.project,projectOwner:event.target.value}})
    }

    handleProjectMajorImpactChange(event){
        this.setState({...this.state,project:{...this.state.project,majorImpact:event.target.value}})
    }

    handleProjectCommentsChange(event){
        this.setState({...this.state,project:{...this.state.project,projectComments:event.target.value}})
    }

    handleRecordDescriptionChange(event){
        this.setState({...this.state,record:{...this.state.record,description:event.target.value}})
    }

    handleActionTakenChange(event){
        this.setState({...this.state,record:{...this.state.record,actionTaken:event.target.value}})
    }

    addReview(){
        //console.log(JSON.stringify(this.state));
        var payload= this.state;
        
        payload.employee = "resource:org.sjsu.reviewnet.Employee#initial";
        console.log("payload is: "+JSON.stringify(payload));
        composerAPI.postInitialReview(payload)
        .then(res=>{
            if(res.status === 200){
                
                var addReviewData = {
                    "$class": "org.sjsu.reviewnet.AddReview",
                    "review": "resource:org.sjsu.reviewnet.Review#"+this.state.reviewID,
                    "reviewedEmployee": "resource:org.sjsu.reviewnet.Employee#"+this.props.currentEmployee.ID
                };
                composerAPI.postReview(addReviewData)
                .then(res=>{
                    if(res.status === 200){
                        NotificationManager.success("Success","Addition done",2500,true);
                    }
                })
            }
            else{
                NotificationManager.error("Fail","Addition Failed",2500,true);
            }
        })
    }

    createReviewData(){
        return(
            <div>
                <div className="row">
                <div className="col-md-2" style={{fontWeight:'bold',
                    color: '#333',
                    fontSize:'14px',marginTop:"15px",marginLeft:"0px"}}>
                    Select Review Type:
                </div>
                    <div className="col-md-9">
                        <SelectField
                            value={this.state.reviewType}
                            onChange={this.handleReviewTypeChange}
                            maxHeight={200}  
                            style={{marginTop:"0px",width:"292px"}}
                        >
                            {reviewTypes}
                        </SelectField>
                    </div>
                    
                </div>
                <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'0px',marginLeft:'0px'}}/>    
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Reviewer Type
                    </div>
                    <div className="col-md-9">
                    <div>{this.props.userData.data.designation}</div>   
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>

                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Reviewer ID
                    </div>
                    <div className="col-md-9">
                    <div>{this.props.userData.data.ID}</div>   
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                {
                    this.state.reviewType === "Complete" &&
                    <div>
                        <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle1}>
                            Rating
                        </div>
                        <div className="col-md-9">
                            <ReactStars
                                count={5}
                                onChange={this.handleRatingChange}
                                size={24}
                                color2={'#ffd700'} 
                                value={this.state.ratingValue}
                                style={{marginBottom:"20px"}}
                            />
                        </div>
                        <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                        </div>
                        <div className="row" style={itemstyle}>
                        <div className="col-md-2" style={labelstyle1}>
                            Term
                        </div>
                        <div className="col-md-9">
                            <SelectField
                                value={this.state.term}
                                onChange={this.handleTermChange}
                                maxHeight={200}  
                                style={{marginTop:"0px",width:"292px"}}
                            >
                                {termTypes}
                            </SelectField>
                        </div>
                        <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                        </div>
                    </div>
                }
                
                <br/>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Year
                    </div>
                    <div className="col-md-9">
                        <input 
                                id="year"
                                type="text" 
                                name="FirstName" 
                                style={inputstyle}
                                onChange={(event)=>this.handleYearChange(event)}
                            />
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>

                {
                    this.state.reviewType === "Complete" &&
                    <div>

                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Comments
                            </div>
                            <div className="col-md-9">
                                <input 
                                        id="comments"
                                        type="text" 
                                        name="FirstName" 
                                        style={inputstyle}
                                        onChange={(event)=>this.handleCommentsChange(event)}
                                    />
                            </div>
                            <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                        </div>

                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Awards
                            </div>
                            <div className="col-md-9">
                                <input 
                                        id="awards"
                                        type="text" 
                                        name="FirstName" 
                                        style={inputstyle}
                                        onChange={(event)=>this.handleAwardsChange(event)}
                                    />
                            </div>
                            <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                        </div>

                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Warnings
                            </div>
                            <div className="col-md-9">
                                <input 
                                        id="warnings"
                                        type="text" 
                                        name="FirstName" 
                                        style={inputstyle}
                                        onChange={(event)=>this.handleWarningsChange(event)}
                                    />
                            </div>
                            <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                        </div>
                    </div>
                }
                {
                    (this.state.reviewType === "Complete" || this.state.reviewType === "Project") &&
                    <div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={bstyle}>
                                Project
                            </div>       
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                ProjectID
                            </div>
                            <div className="col-md-9">
                            <input 
                                    id="projectId"
                                    type="text" 
                                    name="Street" 
                                    defaultValue={this.state.street?this.state.street:''}
                                    style={inputstyle}
                                    onChange={(event)=>this.handleProjectIDChange(event)}
                                    />
                            </div>
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Project Name
                            </div>
                            <div className="col-md-9">
                            <input 
                                        id="projectName"
                                        type="text" 
                                        name="City" 
                                        defaultValue={this.state.city?this.state.city:''}
                                        style={inputstyle}
                                        onChange={(event)=>this.handleProjectNameChange(event)}
                                    />
                            </div>  
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Project Owner
                            </div>
                            <div className="col-md-9">
                            <input 
                                    id="projectOwner"
                                    type="text" 
                                    name="Street" 
                                    defaultValue={this.state.street?this.state.street:''}
                                    style={inputstyle}
                                    onChange={(event)=>this.handleProjectOwnerChange(event)}
                                    />
                            </div>
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Major Impact
                            </div>
                            <div className="col-md-9">
                            <input 
                                        id="majorImpact"
                                        type="text" 
                                        name="City" 
                                        defaultValue={this.state.city?this.state.city:''}
                                        style={inputstyle}
                                        onChange={(event)=>this.handleProjectMajorImpactChange(event)}
                                    />
                            </div>  
                        </div>

                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Project Comments
                            </div>
                            <div className="col-md-9">
                            <input 
                                        id="projectComments"
                                        type="text" 
                                        name="City" 
                                        defaultValue={this.state.city?this.state.city:''}
                                        style={inputstyle}
                                        onChange={(event)=>this.handleProjectCommentsChange(event)}
                                    />
                            </div>  
                        </div>

                        <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/> 

                    </div>
                }
                
                {
                    (this.state.reviewType === "Complete" || this.state.reviewType === "Incidents and Records") &&
                    <div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={bstyle}>
                                Record
                            </div>       
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle1}>
                                Type
                            </div>
                            <div className="col-md-9">
                                <SelectField
                                    value={this.state.record.type}
                                    onChange={this.handleRecordTypeChange}
                                    maxHeight={200}  
                                    style={{marginTop:"0px",width:"292px"}}
                                >
                                    {recordTypes}
                                </SelectField>
                            </div>
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle1}>
                                Level
                            </div>
                            <div className="col-md-9">
                                <SelectField
                                    value={this.state.record.level}
                                    onChange={this.handleRecordLevelChange}
                                    maxHeight={200}  
                                    style={{marginTop:"0px",width:"292px"}}
                                >
                                    {recordLevels}
                                </SelectField>
                            </div>  
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Description
                            </div>
                            <div className="col-md-9">
                            <input 
                                    id="description"
                                    type="text" 
                                    name="Street" 
                                    defaultValue={this.state.street?this.state.street:''}
                                    style={inputstyle}
                                    onChange={(event)=>this.handleRecordDescriptionChange(event)}
                                    />
                            </div>
                        </div>
                        <div className="row" style={itemstyle}>
                            <div className="col-md-2" style={labelstyle}>
                                Action Taken
                            </div>
                            <div className="col-md-9">
                            <input 
                                    id="actionTaken"
                                    type="text" 
                                    name="City" 
                                    defaultValue={this.state.city?this.state.city:''}
                                    style={inputstyle}
                                    onChange={(event)=>this.handleActionTakenChange(event)}
                                />
                            </div>  
                        </div>
                    </div> 
                }

                 <RaisedButton primary={true} style={{marginBottom:"40px",marginLeft:"200px",width:"200px"}} onClick={()=>this.addReview()}>
                    Submit Review
                </RaisedButton>
                
            </div>
        )
    }

    render(){
        return(
            <div>   
               
                <div className="row">
                    
                    <span style={titlestyle}>
                        Add Review for {this.props.currentEmployee.firstName + " " + this.props.currentEmployee.lastName}
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>   
                    <br/>  
                    {this.createReviewData()}
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
        loginModal:state.loginModal,
        userData:state.userData,
        currentEmployee:state.currentEmployee
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            
        }
        ,dispatch);
  }
  
export default connect(mapStateToProps,matchDispatchToProps)(AddReview);
