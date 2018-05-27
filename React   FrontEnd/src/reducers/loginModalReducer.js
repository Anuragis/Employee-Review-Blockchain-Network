import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    isOpen:false,
};

export default function(state=initialState,action){
    switch(action.type){
        
        case "LOGIN_MODAL_OPEN":
        {
            return {
                isOpen:true,
                
            };
        }

        case "LOGIN_MODAL_DONE":
        {
            return {
                isOpen:false,
            };
        }
        case "persist/REHYDRATE":
        {
            var incoming = action.payload.loginModal
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}