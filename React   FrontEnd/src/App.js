import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Home from './components/Home';
import Employee from './components/Employee';
import Reviewer from './components/Reviewer';

import {NotificationContainer, NotificationManager} from 'react-notifications';

const  App = () => {
    return(
      <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/employee" component={Employee}/>
        <Route exact path="/reviewer" component={Reviewer}/>
        <Route exact path="/reviewer/details" component={Reviewer}/>
        <Route exact path="/reviewer/add-review" component={Reviewer}/>
        <Route exact path="/reviewer/employees" component={Reviewer}/>
        <Route exact path="/reviewer/transactions" component={Reviewer}/>
        <Route exact path="/reviewer/show-history" component={Reviewer}/>
        <Route exact path="/reviewer/quick-analysis" component={Reviewer}/>

        <Route exact path="/employee/details" component={Employee}/>
        <Route exact path="/employee/transactions" component={Employee}/>
        <Route exact path="/employee/quick-analysis" component={Employee}/>
                        
        <NotificationContainer/>
      </div>);
}

export default App;

