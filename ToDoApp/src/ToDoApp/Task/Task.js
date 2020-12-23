import classes from './Task.module.css';
import React from 'react';

const Task = (props) => {

    return <div className={classes.Task} style={
        {
            color: props.priority,
            border: '3px dashed ' + props.priority
        }
    }>
        <p className={classes.Title}>{props.title}</p>
        <p className={classes.DueDate}>{props.dueDate}</p>
        <div className={classes.DeleteButton} onClick={ props.clicked } > X </div>
        
    </div>
}

export default Task