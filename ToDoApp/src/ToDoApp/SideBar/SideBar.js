import React, { Fragment } from 'react';
import classes  from './SideBar.module.css';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actionTypes/actionTypes'

const SideBar = (props) => {


    const projects = props.projectHolder


    const projectButton = projects.map((element, index) => {
        return (
        <div key={index} className={classes.ProjectOpenerHolder}>
            <button className={classes.ProjectOpenerDeleteButton} onClick={
               () => { props.turnOnAreYouSure();
                props.addedProjectToAwaitingDeletion(element); }
            }>X</button>
            <button className={classes.ProjectOpenerButton} key={Math.random()} onClick={() => {
            props.changeDisplayedProject(element);
            props.turnOffIsItNew();
            props.turnOffSideBar();
            props.turnOffAreYouSure();
        }}>{element.projectTitle}</button>
        </div>
        )
    })

    let emptyProject = props.projectHolder.projects ? props.projectHolder.projects[0] :  {
        projectTitle: '',
        projectDescription: '',
        tasks: []
    }
    
    let areYouSureModal = null
    if(props.areYouSureIsOpen) {
        areYouSureModal = <div className={classes.AreYouSureModal}>
            <p className={classes.WarningMessage}>Are you sure you want to delete {props.projectInLimbo.projectTitle}?</p>
            <button className={classes.NoButton} onClick={
               () => { props.turnOffAreYouSure();
                         } } >NO</button>
            <button className={classes.YesButton} onClick={
               () => { props.turnOffAreYouSure();
                        alert(props.projectInLimbo.projectTitle + ' was deleted.')
                        props.deleteTheProject(props.projectInLimbo)
                        props.changeDisplayedProject(emptyProject);
                         }} >YES</button>
        </div>
    }

    let sidebarStyled = props.sideBarIsOpen ? classes.SideBar : classes.SideBarSlideOut


    if(props.sideBarInitial) {
        sidebarStyled = classes.SideBarInitial
    }



    return (
        <Fragment>
            
            <div className={sidebarStyled}>
                <span></span>

                <div className={classes.Projects}>
                    <p className={classes.ProjectMarker}><strong>PROJECTS</strong></p>
                    {projectButton}
                </div>
                
                <button className={classes.AddNewProjectButton} onClick={ () => {
                        props.turnOffAreYouSure();
                        props.toggleHomeButton();
                        props.openAddProjectModal();
                        
                        
                         }}><strong>ADD NEW PROJECT</strong></button>
            </div>
            {areYouSureModal}
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleHomeButton: () => dispatch({type: actionTypes.TOGGLE_HOME_BUTTON}),
        openAddProjectModal: () => dispatch({type: actionTypes.TOGGLE_ADD_PROJECT_MODAL}),
        changeDisplayedProject: (element) => dispatch({type: actionTypes.CHANGE_DISPLAYED_PROJECT, changeDisplayedProject: element}),
        turnOffSideBar: () => dispatch({type: actionTypes.TURN_OFF_BACKDROP}),
        turnOffIsItNew: () => dispatch({type:actionTypes.CHANGE_IS_IT_NEW}),
        turnOnAreYouSure: () => dispatch({type: actionTypes.TURN_ON_ARE_YOU_SURE}),
        turnOffAreYouSure: () => dispatch({type: actionTypes.TURN_OFF_ARE_YOU_SURE}), 
        addedProjectToAwaitingDeletion: (element) => dispatch({type: actionTypes.ADDED_TO_AWAITING_DELETION, projectToBeDeleted: element }),
        deleteTheProject: (element) => dispatch({type: actionTypes.DELETE_THE_PROJECT, projectToBeDeleted: element})
        
    }
}
const mapStateToProps = state => {
    return {
        sideBarIsOpen: state.sdbrspn.sideBarIsOpen,
        projectHolder: state.prjcthldr.projects,
        areYouSureIsOpen: state.rysr.areYouSure,
        projectInLimbo: state.wtngdltn.awaitingDeletionProject,
        sideBarInitial: state.sdbrspn.sideBarInitial
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)