import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoginModal from './LoginModal';
import CustomNavbar from './CustomNavbar';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
var ratingChartData;
var recordsChartData;

var mixGraphData;
var incidentLevelData;

var midYearData;
var yearEndData;

class QuickAnalysis extends Component{

    componentWillMount(){

       var data=this.props.analysisData;
           //console.log(JSON.stringify(data[0]));
        var jsonString = [];
           
           var numericRating=0;
           var midYear=[0,0,0,0];
           var yearEnd=[0,0,0,0];           
           var ratingsCount=[0,0,0,0,0,0];
           var recordTypes=[0,0,0,0];
           var incidentLevels=[0,0,0,0];
           for(var i=0;i<data.length;i++){
                jsonString.push(JSON.parse(JSON.stringify(data[i])));
       
               switch(jsonString[i].rating){
                   case "NA": ratingsCount[0]=ratingsCount[0]+1;numericRating=0;break;
                   case "top":ratingsCount[1]=ratingsCount[1]+1;numericRating=5;break;
                   case "excellent":ratingsCount[2]=ratingsCount[2]+1;numericRating=4;break;
                   case "good":ratingsCount[3]=ratingsCount[3]+1;numericRating=3;break;
                   case "average":ratingsCount[4]=ratingsCount[4]+1;numericRating=2;break;
                   case "poor":ratingsCount[5]=ratingsCount[5]+1;numericRating=1;break;
               }
               
               switch(jsonString[i].year){
                   case "2014":(jsonString[i].term==="midYear")?midYear[0]=numericRating:yearEnd[0]=numericRating;break;
                   case "2015":(jsonString[i].term==="midYear")?midYear[1]=numericRating:yearEnd[1]=numericRating;break;
                   case "2016":(jsonString[i].term==="midYear")?midYear[2]=numericRating:yearEnd[2]=numericRating;break;
                   case "2017":(jsonString[i].term==="midYear")?midYear[3]=numericRating:yearEnd[3]=numericRating;break;
               }
               
               switch(jsonString[i].record.type){
                   case "other":recordTypes[0]=recordTypes[0]+1;break;
                   case "longLeaves":recordTypes[1]=recordTypes[1]+1;break;
                   case "complaint":recordTypes[2]=recordTypes[2]+1;break;
                   case "policyVoilation":recordTypes[3]=recordTypes[3]+1;break;
               }
               
               switch(jsonString[i].record.level){
                   case "critical":incidentLevels[0]=incidentLevels[0]+1;break;
                   case "high":incidentLevels[1]=incidentLevels[1]+1;break;
                   case "medium":incidentLevels[2]=incidentLevels[2]+1;break;
                   case "minor":incidentLevels[3]=incidentLevels[3]+1;break;
               }
               
               
           }

           ratingChartData = {
                labels: [
                    'NA',
                    'Top',
                    'Excellent',
                    'Good',
                    'Average',
                    'Poor'
                ],
                datasets: [{
                    data: ratingsCount,
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]                
                }]
            };

            incidentLevelData = {
                labels: [
                    "High",
                    "Critical",
                    "Medium",
                    "Minor"
                ],
                datasets: [{
                    data: incidentLevels,
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]                
                }]
            };

            recordsChartData = {
                labels: [
                    'Other',
                    'Long Leaves',
                    'Complaint',
                    'Policy Violation',
                ],
                datasets: [{
                    data: recordTypes,
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                                  
                }]
            }

            mixGraphData = {
                labels: ['2014', '2015', '2016', '2017'],
                datasets: [{
                    label: 'Mid Year',
                    type:'line',
                    data: midYear,
                    fill: false,
                    borderColor: '#4FC3F7',
                    backgroundColor: '#4FC3F7',
                    pointBorderColor: '#4FC3F7',
                    pointBackgroundColor: '#4FC3F7',
                    pointHoverBackgroundColor: '#4FC3F7',
                    pointHoverBorderColor: '#4FC3F7',
                    
                  },
                  {
                    label: 'Year End',
                    type:'line',
                    data: yearEnd,
                    fill: false,
                    borderColor: '#EC932F',
                    backgroundColor: '#EC932F',
                    pointBorderColor: '#EC932F',
                    pointBackgroundColor: '#EC932F',
                    pointHoverBackgroundColor: '#EC932F',
                    pointHoverBorderColor: '#EC932F',
                    
                  },
                  {
                    type: 'bar',
                    label: 'Average',
                    data: [(midYear[0]+yearEnd[0])/2, (midYear[1]+yearEnd[1])/2,(midYear[2]+yearEnd[2])/2, (midYear[3]+yearEnd[3])/2],
                    fill: false,
                    backgroundColor: '#71B37C',
                    borderColor: '#71B37C',
                    hoverBackgroundColor: '#71B37C',
                    hoverBorderColor: '#71B37C',
                   
                  }]
              };

              midYearData={
                labels: [
                '2014',
                '2015',
                '2016',
                '2017'
                ],
                datasets: [{
                    data: midYear,
                    label:"Mid Year",
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                    ]                
                }]
            }

            yearEndData={
                labels: [
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                ],
                datasets: [{
                    data: yearEnd,
                    label: "Year End",
                    backgroundColor:[
                        
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                    ]                
                }]
        }
              
           
       }

    render(){
        return(
            <div>   
                <div className="row">
                    
                    {
                        (this.props.currentEmployee.firstName !== undefined) &&
                        <span style={titlestyle}>
                            Quick Analysis of {this.props.currentEmployee.firstName + " " + this.props.currentEmployee.lastName}
                        </span> 
                    }

{
                        (this.props.currentEmployee.firstName === undefined) &&
                        <span style={titlestyle}>
                            Quick Analysis of {this.props.userData.data.firstName + " " + this.props.userData.data.lastName}
                        </span> 
                    }
                        
                    
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>   
                    <br/>  

                    <div className="row">
                        <div className="col-md-8" style={{marginLeft:"150px"}}>
                            <span style={titlestyle}>
                                Rating Pie-Chart
                            </span> 
                            <br/>
                            <Pie
                                data={ratingChartData}
                                
                            />
                        </div>
                    </div> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'27px',marginLeft:'0px'}}/>

                    <div className="row" style={{marginLeft:"30px"}}>
                        <span style={titlestyle}>
                                Yearly Rating Trend
                        </span> 
                        <br/>
                        <br/>
                        <div className="col-md-5">
                            <Bar
                
                            data={midYearData}
                            
                        />

                        </div>

                        <div className="col-md-5">

                            <Bar
                                data={yearEndData}
                            />

                        </div>
                        
                    </div>

                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'27px',marginLeft:'0px'}}/>
                    
                    <div className="row" style={{marginLeft:"30px"}}>
                        <span style={titlestyle}>
                                Average yearly performance Trend
                        </span>
                        <br/>
                        <br/>
                        <div className="col-md-10" style={{marginLeft:"20px"}}>
                            <Bar
                                data={mixGraphData}
                                
                            />
                        </div>
                    </div>
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'27px',marginLeft:'0px'}}/>

                    <div className="row">
                        
                        <div className="col-md-5 col-md-offset-1">
                        <span style={titlestyle}>
                                Employee Incident Records
                        </span>
                        <br/>
                        <br/>
                            <Doughnut
                
                            data={recordsChartData}
                            
                        />

                        </div>

                        <div className="col-md-5 ">
                            <span style={titlestyle}>
                                    Level of Recorded Incidents
                            </span>
                            <br/>
                            <br/>
                            <Pie
                                data={incidentLevelData}
                                
                            />

                        </div>
                        
                    </div>
                    <br/>

                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'27px',marginLeft:'0px'}}/>
                    
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
        analysisData:state.analysisData,
        currentEmployee:state.currentEmployee,
        userData:state.userData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(QuickAnalysis));
