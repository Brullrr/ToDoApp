import classes from './ProjectDisplay.module.css';
import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import Task from '../Task/Task';
import * as actionTypes from '../../store/actionTypes/actionTypes';



const ProjectDisplay = (props) => {
     
        // props.projects.forEach((element) => {
        //     if(element.projectTitle === props.currentlyDisplayedProject.projectTitle) {
        //         props.updateCurrentlyDisplayed(element);
        //     }
        // })
   
    useEffect((prevProps) => { 
       
        if(props.refreshHeader) {        
            props.updateCurrentlyDisplayed(props.currentlyDisplayedProject);
            props.turnOffHeaderRefresh(); 
        }

        if(prevProps !== props.currentlyDisplayedProject && props.refreshHeader ){ 
            props.newTaskWasAdded();
            props.turnOffHeaderRefresh();     
         }
    })

    let tasks = props.currentlyDisplayedProject.tasks
    const tasksMapped = tasks.map((element, index) => <Task 
                                                    key={Math.random()}  
                                                    title={element[0].title} 
                                                    dueDate={element[0].dueDate}
                                                    priority={element[0].priority}
                                                    clicked={ () => {props.deleteTask(index); }} /> )
    return (
        <Fragment>
            <div className={classes.ProjectDisplay}>
                {tasksMapped}
            </div>
            
        </Fragment>
        
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateCurrentlyDisplayed: (mostRecentlyCreatedProject) => dispatch({type: actionTypes.UPDATE_CURRENTLY_DISPLAYED, mostRecentlyCreatedProject: mostRecentlyCreatedProject }),
        newTaskWasAdded: () => dispatch({type: actionTypes.ADD_NEW_TASK_REFRESH_DISPLAY}),
        turnOffHeaderRefresh: () => dispatch({type: actionTypes.TURN_OFF_HEADER_REFRESH}),
        deleteTask: (index) => dispatch({type: actionTypes.DELETE_TASK, index: index}),
        updateTasks: (element) => dispatch({type: actionTypes.UPDATE_TASKS, updatedTasks: element})
    }
}

const mapStateToProps = state => {
    return {
        currentlyDisplayedProject: state.crrntlDsplydPrjct.currentlyDisplayedProject,
        refreshHeader: state.crrntlDsplydPrjct.refreshHeader,
        projects: state.prjcthldr.projects
    }
     
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDisplay)