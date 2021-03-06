/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import UpdateItem from './UpdateItem.jsx'
import {loadItem, writeItem} from '../actions/items'

function mapStateToProps({session,items},{name}){
  return {
    session,
    item:items[name]
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadItem: (name)=>dispatch(loadItem(name)),
    save: (name,content,message)=>dispatch(writeItem(name,content,message))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UpdateItem))