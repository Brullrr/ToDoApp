import * as actionTypes from '../actionTypes/actionTypes';


const initialstate = {
    areYouSure: false
}


const reducer = ( state = initialstate, action ) => {

    if(action.type === actionTypes.TURN_ON_ARE_YOU_SURE) {
        return {
            ...state,
            areYouSure: true
        }
    }
    if(action.type === actionTypes.TURN_OFF_ARE_YOU_SURE) {
        return {
            ...state,
            areYouSure: false
        }
    }


    return state
}

export default reducer