import {REHYDRATE} from 'redux-persist/constants';

export default function(state={},action){
    switch(action.type){
        
        case "QUICK_ANALYSIS_DATA":
        {
            return action.data
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.analysisData
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}