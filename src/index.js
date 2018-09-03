/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from './components/helper'
import App from './components/App'
import {loadItems} from './actions/items'
import registerServiceWorker from './registerServiceWorker'

const store=createStore()
store.dispatch(loadItems())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))  
registerServiceWorker()
