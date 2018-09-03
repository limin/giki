/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import {
  ITEMS_RECEIVED
} from '../actions/items'

export default function items(state={},action){
  switch(action.type){
    case ITEMS_RECEIVED:{
      const items=action.items
      const newState=JSON.parse(JSON.stringify(state))
      items.forEach(item=>{
          newState[item.name]=JSON.parse(JSON.stringify(item))
      })
      return newState
    }
    default:
      return state
  }
}
