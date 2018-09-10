/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import {
  SURLS_RECEIVED
} from '../actions/surls'

export default function surls(state={},action){
  switch(action.type){
    case SURLS_RECEIVED:{
      const surls=action.surls
      const newState=JSON.parse(JSON.stringify(state))
      surls.forEach(surl=>{
          const newSurl=JSON.parse(JSON.stringify(surl))
          newState[surl.hash]=newSurl
          newState[surl.name]=newSurl
      })
      return newState
    }
    default:
      return state
  }
}