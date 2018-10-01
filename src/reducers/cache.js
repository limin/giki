/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {combineReducers } from 'redux'

import {
  LANGUAGE_CHANGED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  MESSAGES_RECEIVED,
  MESSAGES_DELETED
} from '../actions/session'

function user(state=null,action){
  switch (action.type) {
    case USER_LOGGED_IN:{
      return JSON.parse(JSON.stringify(action.user))
    }
    case USER_LOGGED_OUT:{
      return null
    }
    default:
      return state
  }
}

function language(state=null,action){
  switch (action.type) {
    case LANGUAGE_CHANGED:{
      return action.language
    }
    default:
      return state
  }
}

function messages(state={},action){
  switch (action.type) {
    case MESSAGES_RECEIVED:{
      const messages=action.messages
      const newState=JSON.parse(JSON.stringify(state))
      messages.forEach(message=>{
          const newMessage=JSON.parse(JSON.stringify(message))
          newState[message.name]=newMessage
      })
      return newState
    }
    case MESSAGES_DELETED:{
      const newState=JSON.parse(JSON.stringify(state))
      if(action.names){
        action.names.forEach((name)=>{
          delete newState[name]
        })
        return newState
      }else{
        return {}
      }
    }
    default:
      return state
  }
}

export default combineReducers({language,user,messages})
