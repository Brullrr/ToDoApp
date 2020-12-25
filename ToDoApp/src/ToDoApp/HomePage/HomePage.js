import React, { Fragment } from 'react';
import Header  from '../Header/Header';
import { connect } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import Backdrop from '../UI/Backdrop/Backdrop';
import NewProjectModal from '../NewProjectModal/NewProjectModal';
import * as actionTypes from '../../store/actionTypes/actionTypes';
import ProjectDisplay from '../ProjectDsiplay/ProjectDisplay';
import classes from './HomePage.module.css';
import NewTaskModal from '../NewTaskModal/NewTaskModal';
import concreteWall from '../../Images/concrete-wall-background.jpg';


const HomePage = (props) => {

    
    let sideBar = <SideBar />
    
    let newProjectModal = null
    if(props.addNewProjectIsOpen) {
        newProjectModal = <NewProjectModal />
    }
    let newTaskModal = null
    if(props.addNewTaskIsOpen) {
        newTaskModal = <NewTaskModal />
    }

    let taskButton = props.projectsExist ? <button className={classes.AddTask} onClick={
        props.openAddTaskModal
    }>+</button> : null


    let show = null;
    if(props.sideBarIsOpen || props.addNewProjectIsOpen || props.addNewTaskIsOpen) {
        show = true
    }

    return (
        <Fragment>
            <div className={classes.HomePage}  style={
                {
                    backgroundImage: `url(${concreteWall})`,
                    backgroundSize: '100% 100%'
                }
            }>

                <Header />
                <Backdrop show={show} clicked={ () => { props.turnOffBackdrop(); props.turnOffAreYouSure(); }} />
                {sideBar}
                {newProjectModal}
                
                <ProjectDisplay />
                {taskButton}
                {newTaskModal}
                {/* <div>Projects</div>
                <div>array holding projects each with a button to activate their main screen</div>
                <div>create a new project button</div> */}

            </div>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        turnOffBackdrop: () => dispatch({type: actionTypes.TURN_OFF_BACKDROP}),
        openAddProjectModal: () => dispatch({type: actionTypes.TOGGLE_ADD_PROJECT_MODAL}),
        openAddTaskModal: () => dispatch({type: actionTypes.TOGGLE_ADD_TASK_MODAL}),
        turnOffAreYouSure: () => dispatch({type: actionTypes.TURN_OFF_ARE_YOU_SURE})
    }
}


const mapStateToProps = state => {
    return {
        sideBarIsOpen: state.sdbrspn.sideBarIsOpen,
        addNewProjectIsOpen: state.ddprjctmdlspn.projectModalIsOpen,
        addNewTaskIsOpen: state.ddtskmdlspn.taskModalIsOpen,
        projectsExist: state.prjcthldr.projects.length
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)