/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {connect} from 'react-redux'
import ViewItem from './ViewItem.jsx'
import {readRawFile} from '../actions/items'

function mapStateToProps({session,items},{name}){
  return {
    session,
    item:items[name] || {name}
  }
}

function mapDispatchToProps(dispatch){
  return {
    readRawFile: (name)=>dispatch(readRawFile(name))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewItem)