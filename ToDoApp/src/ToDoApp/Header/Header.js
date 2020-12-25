import React, { Fragment, useEffect } from 'react';
import classes from './Header.module.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actionTypes/actionTypes'
import homeIcon from './HomeIcon.png';
import menuIcon from '../../Images/MenuIcon.png';
import transDragon from '../../Images/TransDrag.png';


const Header = (props) => {
    // console.log('[Header Component] This just ran. ')

    


    useEffect((prevProps) => {
        

        if(prevProps !== props.mostRecentlyCreatedProject && props.isItNew ){ 
            props.updateCurrentlyDisplayed(props.mostRecentlyCreatedProject);
         }

         if(props.refreshHeader) {
            props.updateCurrentlyDisplayed(props.currentProject)
         }
    });
    let title = props.title

    if(title.length === 0 && props.projects.length > 0){
        title = props.projects[0].projectTitle
    }

    if(title.length === 0) {
        title = 'Welcome'
    }
    


    // const componentDidUpdate = (prevProps) => {

        
    //     if(prevProps !== props.mostRecentlyCreatedProject && props.isItNew ){ 
    //         props.updateCurrentlyDisplayed(props.mostRecentlyCreatedProject);
    //      }

    //      if(props.refreshHeader) {
    //         props.updateCurrentlyDisplayed(props.currentProject)
    //      }
    // }
    // componentDidUpdate();

    return (

        <Fragment>
            <button className={ props.sideBarIsOpen ? classes.MenuButton : classes.HomeButton } onClick={ () => { props.toggleHomeButton(); props.turnOffAreYouSure(); props.turnOffSideBarInitial(); }} style={
                {
                    backgroundImage: props.sideBarIsOpen ? `url(${menuIcon})` : `url(${homeIcon})`,
                    backgroundSize: '100% 100%'
                } 
            }></button>
            <div className={classes.Header} style={
                {
                    backgroundImage: `url(${transDragon})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right'
                }
            }>
                <p className={classes.Title}>{title}</p>
            </div>

        </Fragment>
        
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleHomeButton: () => dispatch({type: actionTypes.TOGGLE_HOME_BUTTON}),
        updateCurrentlyDisplayed: (mostRecentlyCreatedProject) => dispatch({type: actionTypes.UPDATE_CURRENTLY_DISPLAYED, mostRecentlyCreatedProject: mostRecentlyCreatedProject }),
        turnOffHeaderRefresh: () => dispatch({type: actionTypes.TURN_OFF_HEADER_REFRESH}),
        refreshPage: () => dispatch({type: actionTypes.ADD_NEW_TASK_REFRESH_DISPLAY}),
        turnOffAreYouSure: () => dispatch({type: actionTypes.TURN_OFF_ARE_YOU_SURE}),
        turnOffSideBarInitial: () => dispatch({type: actionTypes.TURN_OFF_SIDEBAR_INITIAL})
    }
}

const mapStateToProps = state => {
    return {
        sideBarIsOpen: state.sdbrspn.sideBarIsOpen,
        title: state.crrntlDsplydPrjct.currentlyDisplayedProject.projectTitle,
        isItNew: state.crrntlDsplydPrjct.isItNew,
        mostRecentlyCreatedProject: state.prjcthldr.projects[state.prjcthldr.projects.length - 1],
        refreshHeader: state.crrntlDsplydPrjct.refreshHeader,
        currentProject: state.crrntlDsplydPrjct.currentlyDisplayedProject,
        projects: state.prjcthldr.projects

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)