/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore } from './helper'
import App from './App'


test('renders without crashing', () => {
  const store=createStore()
  const div = document.createElement('div');
  ReactDOM.render(  
  <Provider store={store}>
    <App session={store.getState().session}/>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
})
