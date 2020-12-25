import * as actionTypes from '../actionTypes/actionTypes';



const initialstate = {
    sideBarIsOpen: false,
    sideBarInitial: true
}


const reducer = ( state = initialstate, action ) => {

    if(action.type === actionTypes.TOGGLE_HOME_BUTTON) {
        return {
            ...state,
            sideBarIsOpen: !state.sideBarIsOpen
        }
    }

    if(action.type === actionTypes.TURN_OFF_BACKDROP) {
        return {
            ...state,
            sideBarIsOpen: false
        }
        
    }

    if(action.type === actionTypes.TURN_OFF_SIDEBAR_INITIAL){
        return {
            ...state,
            sideBarInitial: false
        }
    }

    return state
}

export default reducer