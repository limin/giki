/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {connect} from 'react-redux'
import Item from './Item.jsx'
import {loadItem} from '../actions/items'
import {writeSurl} from '../actions/surls'

function mapStateToProps({session,items,surls},{name}){
  return {
    session,
    item:items[name],
    surl:surls[name]
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadItem: (name)=>dispatch(loadItem(name)),
    writeSurl:(name)=>dispatch(writeSurl(name))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Item)