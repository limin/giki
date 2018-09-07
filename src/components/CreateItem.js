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
import CreateItem from './CreateItem.jsx'
import {writeItem} from '../actions/items'

function mapStateToProps({session,items},{name}){
  return {
    session
  }
}

function mapDispatchToProps(dispatch){
  return {
    create: (item,message)=>dispatch(writeItem(item,message))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CreateItem))