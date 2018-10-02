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
import {pouchstore} from '../api'
import reducer from '../reducers'

export function createStore(){
  let user=null
  try{
    user =JSON.parse(window.sessionStorage.getItem("user"))
  }catch(e){
    console.err(e)
  }
  return Promise.all([pouchstore.load('item'),pouchstore.load('surl')]).then(([items,surls])=>{
    const preloadedState={
      session:{
        user:user,
        language:'cn',
        messages:{}
      },
      items:{},
      surls:{}
    }
    const loggerMiddleware = createLogger()
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware,loggerMiddleware ))
    return redux.createStore(reducer,preloadedState,enhancer)  
  })
}
