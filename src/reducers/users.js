/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {
  USERS_RECEIVED
} from '../actions/users'

export default function users(state={},action){
  switch(action.type){
    case USERS_RECEIVED:{
      const users=action.users
      const newState=JSON.parse(JSON.stringify(state))
      users.forEach(user=>{
          newState[user._id]=JSON.parse(JSON.stringify(user))
      })
      return newState
    }
    default:
      return state
  }
}
