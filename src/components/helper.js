/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import {applyMiddleware,compose } from 'redux'
import * as redux from 'redux'
import reducer from '../reducers'

export function createStore(){
  const preloadedState={
    session:{
      user:null,
      language:'cn',
      messages:{}
    },
    users:{},
    items:{}
  }
  const loggerMiddleware = createLogger()
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware,loggerMiddleware ))
  return redux.createStore(reducer,preloadedState,enhancer)
}
