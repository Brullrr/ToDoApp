import * as actionTypes from '../actionTypes/actionTypes';



const initialstate = {
    taskModalIsOpen: false
}


const reducer = ( state = initialstate, action ) => {
    
    if(action.type === actionTypes.TOGGLE_ADD_TASK_MODAL) {
        
        return {
            ...state,
            taskModalIsOpen: !state.taskModalIsOpen
        }
        
    }
    if(action.type === actionTypes.TURN_OFF_BACKDROP) {
        
        
        return {
            ...state,
            taskModalIsOpen: false
        }
        
    }
    
    return state
}

export default reducer