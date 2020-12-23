import * as actionTypes from '../actionTypes/actionTypes';

const initialstate = {
    awaitingDeletionProject: {
        projectTitle: '',
        projectDescription: '',
        tasks: []
    }
}


const reducer = ( state = initialstate, action ) => {

    if(action.type === actionTypes.ADDED_TO_AWAITING_DELETION) {
        return {
            ...state,
            awaitingDeletionProject: action.projectToBeDeleted
        }
    }
    
    return state
}

export default reducer