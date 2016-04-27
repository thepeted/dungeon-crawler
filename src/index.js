require('./styles/main.sass') // root stylesheeet - .css, .scss or .sass

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
import reducer from './reducers/game';

import createLevel from './bin/map-creator';
import App from './components/app';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducer)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
