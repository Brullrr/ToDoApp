import * as actionTypes from '../actionTypes/actionTypes';

const initialstate = {
    projects: []
}


const reducer = ( state = initialstate, action ) => {

    if(action.type === actionTypes.ADD_PROJECT ) {
        
        let newProjectObject = [{
            projectTitle: action.titleValue,
            projectDescription: action.descriptionValue,
            tasks: []
        }];

        return {
            ...state,
            projects: state.projects.concat(newProjectObject)
        }
    }

    if(action.type === actionTypes.ADD_NEW_TASK){



        let magicNumber = 0
        for(let i=0; i<state.projects.length;i++){
            if(state.projects[i].projectTitle === action.currentlyDisplayedProject.projectTitle) {
                magicNumber = i
            }
        }
        let newTask = [{
            title: action.title,
            dueDate: action.dueDate,
            priority: action.priority
        }]

        const tasks = [...state.projects[magicNumber].tasks, newTask]

            return {
                ...state,
                projects: [
                    ...state.projects.slice(0, magicNumber),
                    Object.assign({}, state.projects[magicNumber], { tasks: [...tasks] }),
                    ...state.projects.slice(magicNumber + 1)
                ],
            }
    }

    if(action.type === actionTypes.DELETE_THE_PROJECT) {
        return {
            ...state,
            projects: state.projects.filter( project => project !== action.projectToBeDeleted)
        }
    }

    
    
    return state
}

export default reducer