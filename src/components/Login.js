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
import Login from './Login.jsx'
import {login} from '../actions/session'


function mapStateToProps({session}){
  return {
    session
  }
}

function mapDispatchToProps(dispatch){
  return{
    login: (username,password)=>dispatch(login(username,password))
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))
