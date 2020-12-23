import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import reducer from './store/reducers/reducer';
import sideBarIsOpen from './store/reducers/sideBarIsOpen';
import projectHolder from './store/reducers/projectHolder';
import addProjectModalIsOpen from './store/reducers/addProjectModalIsOpen';
import currentlyDisplayedProject from './store/reducers/currentlyDisplayedProject';
import addTaskModalIsOpen from './store/reducers/addTaskModalIsOpen';
import areYouSure from './store/reducers/areYouSure';
import awaitingDeletion from './store/reducers/awaitingDeletion';


const rootReducer = combineReducers({
  rdcr: reducer,
  sdbrspn: sideBarIsOpen,
  prjcthldr: projectHolder,
  ddprjctmdlspn: addProjectModalIsOpen,
  crrntlDsplydPrjct: currentlyDisplayedProject, 
  ddtskmdlspn: addTaskModalIsOpen,
  rysr: areYouSure,
  wtngdltn: awaitingDeletion
})
const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }><App  /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
