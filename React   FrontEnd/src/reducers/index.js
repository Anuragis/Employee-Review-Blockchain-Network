import {combineReducers} from 'redux';
import loginModal from './loginModalReducer';
import loginData from './loginReducer';
import userData from './userDataReducer';
import currentEmployee from './currentEmployee';
import analysisData from './quickAnaylsis';

const allReducers = combineReducers({
    loginModal,
    loginData,
    userData,
    currentEmployee,
    analysisData,
    
 });
 
 export default allReducers;