import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    username:'',
    password:'',
}


export default function(state=initialState,action){
    switch(action.type){
        
        case "CHANGE_VALUE_LOGIN":
        {
            return{
                ...state,
                [action.data.target.name]:action.data.target.value
            };
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.loginData
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}