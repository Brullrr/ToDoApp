import classes from './NewTaskModal.module.css';
import React, { useState } from 'react';
import * as actionTypes from '../../store/actionTypes/actionTypes';
import { connect } from 'react-redux';

const NewTaskModal = (props) => {
    
    const [taskTitle, useTaskTitle] = useState('');

    const TaskTitleValue = (e) => {
        useTaskTitle(e.target.value)
    }
    

    const [dateValue, useDateValue] = useState('');

    const DateValueChange = (e) => {
        useDateValue(e.target.value)
    }

    const [priorityValue, usePriorityValue] = useState('lightgreen');

    const PriorityValueChange = (value) => {
        usePriorityValue(value)
    }
    return (

        
    
        <div className={classes.NewTaskModal}>
            <form className={classes.Form}>
                <div>
                    <p>Enter Task to be completed:</p>
                    <input className={classes.Description} type='text' value={taskTitle} maxLength="56" onChange={
                        TaskTitleValue
                    } />
                </div>
                <div className={classes.DueDateForm}>
                    <p>Enter the due date:</p>
                    <input type='date' value={dateValue} onChange={ DateValueChange }/>
                </div>
                <div>
                    <p>Choose the task's priority:</p>
                    <div className={classes.PriorityForm}>
                        <label >High</label>
                        <input className={classes.PriorityHigh} type='radio' name='priority' value='red'  onChange={ () => PriorityValueChange('red')} checked={priorityValue === 'red'}/>
                        <label>Medium</label>
                        <input type='radio' name='priority' value='yellow' onChange={() => PriorityValueChange('yellow')} checked={priorityValue === 'yellow'}/>
                        <label>Low</label>
                        <input type='radio' name='priority' value='lightgreen' onChange={() => PriorityValueChange('lightgreen')} checked={priorityValue === 'lightgreen'} />
                    </div>
                </div>   
            </form>
            <button className={classes.SubmitBtn} onClick={ () => {

                props.updateTasks(taskTitle, dateValue, priorityValue);

                props.addNewTaskToProject(props.currentlyDisplayedProject, taskTitle, dateValue, priorityValue);
                props.toggleTaskModal();
                props.turnOffIsItNew();
                props.refreshDisplay();
                
                 } }>Create New Task</button> 
                
            

        
        </div>)
}


const mapStateToProps = state => {
    return{
        currentlyDisplayedProject: state.crrntlDsplydPrjct.currentlyDisplayedProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTaskModal: () => dispatch({type: actionTypes.TOGGLE_ADD_TASK_MODAL}),
        addNewTaskToProject: (currentlyDisplayedProject, taskTitle, dateValue, priorityValue) => dispatch({type: actionTypes.ADD_NEW_TASK, 
                                                                        currentlyDisplayedProject: currentlyDisplayedProject,
                                                                        title: taskTitle, 
                                                                        dueDate: dateValue, 
                                                                        priority: priorityValue}),
        turnOffIsItNew: () => dispatch({type:actionTypes.CHANGE_IS_IT_NEW}),
        refreshDisplay: () => dispatch({type: actionTypes.ADD_NEW_TASK_REFRESH_DISPLAY}),
        updateTasks: (taskTitle, dateValue, priorityValue) => dispatch({type: actionTypes.UPDATE_TASKS, 
                                                                                title: taskTitle, 
                                                                                dueDate: dateValue, 
                                                                                priority: priorityValue})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskModal)