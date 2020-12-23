import * as actionTypes from '../actionTypes/actionTypes';



const initialstate = {
    projectModalIsOpen: false
}


const reducer = ( state = initialstate, action ) => {
    
    if(action.type === actionTypes.TOGGLE_ADD_PROJECT_MODAL) {
        
        return {
            ...state,
            projectModalIsOpen: !state.projectModalIsOpen
        }
        
    }
    if(action.type === actionTypes.TURN_OFF_BACKDROP) {
        
        
        return {
            ...state,
            projectModalIsOpen: false
        }
        
    }
    
    return state
}

export default reducer