import {REHYDRATE} from 'redux-persist/constants';

export default function(state={},action){
    switch(action.type){
        
        case "CURRENT_EMPLOYEE":
        {
            return action.data
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.currentEmployee
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}