require('./styles/main.sass') // root stylesheeet - .css, .scss or .sass

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
import reducers from './reducers';

import createLevel from './bin/map-creator';
import App from './components/app';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(enableBatching(reducers))}>
    <App />
  </Provider>
  , document.querySelector('.container'));
