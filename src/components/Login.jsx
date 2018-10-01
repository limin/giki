/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import React from 'react'
import update from 'immutability-helper'
import PropTypes from 'prop-types'
import {MESSAGE_INVALID_USERNAME,MESSAGE_INVALID_PASSWORD,STRINGS,TEXT_LOGIN,TEXT_USERNAME,TEXT_PASSWORD} from '../glocalization'




export default class Login extends React.Component{
  state={
    messages:{},
    user:{
      username:"",
      password:"",
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {messages,user}=this.state
    if(user.username.length===0){
      messages['username']={"name":MESSAGE_INVALID_USERNAME, "level":"danger"}
    }
    if(user.password.length===0){
      messages['password']={"name":MESSAGE_INVALID_PASSWORD, "level":"danger"}
    }
    if(messages.hasOwnProperty("username") || messages.hasOwnProperty("password")){
      const newState=update(this.state,{
        user:{$set:user},
        messages:{$set:messages}
      });
      this.setState(newState)
    }else{
      this.props.login(user.username,user.password)
      this.props.history.push("/")
    }    
  }


  //need to be defined here as a method of the component instead inside the render method to avoid focus losing. 
  //see https://stackoverflow.com/questions/22573494/react-js-input-losing-focus-when-rerendering
  Field=({user,label,name,message,type="text"})=>{
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className={message?"control has-icons-right":"control"}>
          <input className={message?"input is-danger":"input"} name={name} value={user[name]} type={type} placeholder={label} onChange={(e)=>this.setState(update(this.state,{user:{[name]:{$set:e.target.value}}}))}/>
          {
            message &&
              <span className="icon is-small is-right">
                <i className="fa fa-warning"></i>
              </span>
          }
        </div>
        {            
          message && <p className="help is-{message.level}">{STRINGS.messages[message.name]}</p>
        }
      </div>
    )
  }
  

  render(){
    const {session}=this.props
    if(session.user!==null){
      this.props.history.push("/")
    }
    const {messages,user}=this.state
    return(
      <div>
      	<h2 className="title">{STRINGS.texts[TEXT_LOGIN]}</h2>
        <form  onSubmit={this.handleSubmit}>
        <this.Field user={user} name="username" label={STRINGS.texts[TEXT_USERNAME]} message={messages["username"]}/>
        <this.Field user={user} name="password" label={STRINGS.texts[TEXT_PASSWORD]} message={messages["password"]} type="password"/>
        <div className="field is-grouped">
          <div className="control">
            <input type="submit" className="button is-link" value={STRINGS.texts[TEXT_LOGIN]}/>
          </div>
        </div>
        </form>
      </div>
      )
  }
}

Login.propTypes={
  session: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}