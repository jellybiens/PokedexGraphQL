import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import '../scss/style.scss';
import '../scss/events.scss';
import '../scss/background.scss';
import '../scss/crt.scss';
import {createStore} from 'redux';

//Step 1
//bringing in data store
import allReducers from './reducers/reducers-index';
const store = createStore(allReducers);

//Step 2
//bring in provider
//give it store in ReactDOM render
//enables access to all component within the provider
import {Provider} from 'react-redux';

//Step 3
//Container
//Can be in a separate file
//but not uncommon to be in the same component file

//Step 4
//Component
//Component is dumb component, no brains
//Container is Component hooked up to Brains
import App from './components/App';

//Step 5
//Actions
//Action is part that is returned
//Made of 2 parts,
//1. type, explains action
//2. payload, data to be used




ReactDOM.render(<Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
