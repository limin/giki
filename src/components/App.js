/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

 import {connect} from 'react-redux'
import App from './App.react'
import {userLoggedOut,languageChanged,messagesDeleted} from '../actions/session'

function mapStateToProps({session}){
  return {
    session
  }
}

function mapDispatchToProps(dispatch){
  return {
    logout: ()=>dispatch(userLoggedOut()),
    changeLanguage: (language)=>dispatch(languageChanged(language)),
    deleteMessages: (message)=>dispatch(messagesDeleted(message.name))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
