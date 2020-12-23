import classes from './NewProjectModal.module.css';
import React, { useState } from 'react';
import * as actionTypes from '../../store/actionTypes/actionTypes';
import { connect } from 'react-redux';


const NewProjectModal = (props) => {
       
    const [titleValue, useTitleValue] = useState('')
    const ChangeValue = (e) => {
            useTitleValue(e.target.value) 
    }

    const [descriptionValue, useDescriptionValue] = useState('')
    const ChangeValueDescription = (e) => {
            useDescriptionValue(e.target.value) 
    }

    let doubleProjectName;
    
    if(props.projects.length !== 0) {
        doubleProjectName = props.projects[0].projectTitle === titleValue ? true : false
    }
    

    

    let invalidReason = titleValue === '' ? <p>Please enter a project name.</p> : null
    if(doubleProjectName) {
        invalidReason = <p>A project with this name already exists.</p>
    }
    

    return <div className={classes.NewProjectModal}>

        <input className={classes.EnterProjectTitle} placeholder='Project Name' value={titleValue} onChange={
            ChangeValue
        } minLength="1" maxLength="20"></input>
        

        <input className={classes.EnterProjectDescription} placeholder='Project Description' value={descriptionValue} onChange={
            ChangeValueDescription
        } ></input>

        <button className={classes.SubmitNewProjectButton} onClick={
            () => {
                if(invalidReason){
                    console.log('User attempted to do something illegal.')
                } else { 
                        props.addNewProject(titleValue, descriptionValue);
                        props.toggleAddProjectModal();
                        props.currentlyDisplayedToTrue();
                    
                }
            }
        }>CREATE NEW PROJECT</button>

        {invalidReason}

    </div>
}


const mapDispatchToProps = dispatch => {
    return {
        addNewProject: (titleValue, descriptionValue) => dispatch({
            type: actionTypes.ADD_PROJECT,
            titleValue: titleValue,
            descriptionValue: descriptionValue
        }),
        toggleAddProjectModal: () => dispatch({type: actionTypes.TOGGLE_ADD_PROJECT_MODAL}),
        currentlyDisplayedToTrue: () => dispatch({type: actionTypes.IS_IT_ON_TO_TRUE})
        
        
    }
}

const mapStateToProps = state => {
    return {
       mostRecentlyCreatedProject: state.prjcthldr.projects[state.prjcthldr.projects.length - 1],
       projects: state.prjcthldr.projects
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectModal)