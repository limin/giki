/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import React, { Component } from 'react'
import {BrowserRouter,Route, Link, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as config from '../config'
import About from './About'
import Login from './Login'
import ItemList from './ItemList'
import Item from './Item'
import {STRINGS,TEXT_HOME,TEXT_ABOUT, TEXT_LOGIN,TEXT_LOGOUT} from '../glocalization'

import '../../node_modules/bulma/css/bulma.css'

export default class App extends Component {
  logout(e){
    e.preventDefault()
    this.props.logout()
  }
  changeLanguage(e,language){
    e.preventDefault()
    STRINGS.setLanguage(language)
    this.props.changeLanguage(language)
  }
  render() {
    const {user,messages}=this.props.session
    return (
      <BrowserRouter basename={config.PUBLIC_URL}>
        <div>
          <nav className="navbar is-transparent">
            <div className="navbar-menu is-active">
              <div className="navbar-start">
                <Link className="navbar-item" to="/">{STRINGS.texts[TEXT_HOME]}</Link>
              </div>

              <div className="navbar-end">
                {!(user) && <Link className="navbar-item" to="/login">{STRINGS.texts[TEXT_LOGIN]}</Link>}
                {(user) && <a className="navbar-item" onClick={(e)=>{this.logout(e)}}>{STRINGS.texts[TEXT_LOGOUT]}({user.name})</a>}
                <Link className="navbar-item" to="/about">{STRINGS.texts[TEXT_ABOUT]}</Link>
              </div>
            </div>
          </nav>
          <section className="section">
            {
              Object.values(messages).map((message)=>(
                <div className={"notification is-"+message.level} key="{message.name}">
                  <button className="delete" onClick={()=>{this.props.deleteMessages([message.name])}}></button>
                  {STRINGS.messages[message.name]}
                </div>
              ))
            }
            {user===null?
            (
              <Switch>
                <Route exact path="/about" render={()=>
                   <About/>                   
          		  }/>
                <Route exact path="/*" render={()=>
          			   <Login/>
          		  }/>
              </Switch>
            ):
            (<Switch>
              <Route exact path="/" render={()=>
                <Redirect to="/list/items" />
              }/>
              <Route exact path="/about" render={()=>
                 <About/>
              }/>
              <Route exact path="/list/items" render={()=>
                 <ItemList/>
              }/>              
              <Route exact path="/item/:name" render={({match})=>
                 <Item name={match.params.name}/>
              }/>                            
            </Switch>)
          }
          </section>
        </div>
      </BrowserRouter>
    )
  }
}

App.propTypes={
  session:PropTypes.object.isRequired,
  logout:PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  deleteMessages: PropTypes.func.isRequired

}
