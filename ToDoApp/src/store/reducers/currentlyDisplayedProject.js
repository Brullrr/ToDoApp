import * as actionTypes from '../actionTypes/actionTypes';

const initialstate = {
    currentlyDisplayedProject: {
        projectTitle: '',
        projectDescription: '',
        tasks: []
    },
    isItNew: true,
    refreshHeader: false
}


const reducer = ( state = initialstate, action ) => {

    
    
    if(action.type === actionTypes.UPDATE_CURRENTLY_DISPLAYED){
        
        return {
            ...state,
            currentlyDisplayedProject: action.mostRecentlyCreatedProject
        }
    }
    if(action.type === actionTypes.CHANGE_DISPLAYED_PROJECT) {
        return {
            ...state,
            currentlyDisplayedProject: action.changeDisplayedProject
        }
    }

    
    if(action.type === actionTypes.CHANGE_IS_IT_NEW) {
        return {
            ...state,
            isItNew: false
        }
    }
    if(action.type === actionTypes.IS_IT_ON_TO_TRUE) {
        return {
            ...state,
            isItNew: true
        }
    }
    if(action.type === actionTypes.ADD_NEW_TASK_REFRESH_DISPLAY) {
        
        return {
            ...state,
            refreshHeader: true
        }
    }
    if(action.type ===actionTypes.TURN_OFF_HEADER_REFRESH) {
        return {
            ...state,
            refreshHeader: false
        }
    }
    if(action.type === actionTypes.DELETE_TASK) {

        return {
            ...state,
            refreshHeader: true,
            tasks: [...state.currentlyDisplayedProject.tasks.splice(action.index, 1)]
        }

    }
    if(action.type === actionTypes.UPDATE_TASKS){
        

        let addedTask = [{
            title: action.title,
            dueDate: action.dueDate,
            priority: action.priority
        }]

        
        return {
            ...state,
            currentlyDisplayedProject: {
                ...state.currentlyDisplayedProject,
                tasks: [...state.currentlyDisplayedProject.tasks].concat([addedTask])
            },
            
            refreshHeader: true
        }

    }

    


    return state
}

export default reducer