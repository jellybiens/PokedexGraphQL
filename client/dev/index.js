import React from 'react';
import ReactDOM from "react-dom";
import './scss/style-index.scss';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

import {createStore} from 'redux';
import allReducers from './js/reducers/reducers-index';
const store = createStore(allReducers);

import {Provider} from 'react-redux';

const client = require('./apollo-provider-client');



ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
