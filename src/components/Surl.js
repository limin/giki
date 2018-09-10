/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {connect} from 'react-redux'
import Surl from './Surl.jsx'
import {readSurl} from '../actions/surls'

function mapStateToProps({session,surls},{hash}){
  return {
    session,
    surl:surls[hash]
  }
}

function mapDispatchToProps(dispatch){
  return {
    readSurl:(hash)=>dispatch(readSurl(hash))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Surl)