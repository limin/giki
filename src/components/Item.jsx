import React  from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import update from 'immutability-helper'
import * as config from '../config'
import {STRINGS,TEXT_UPDATE,TEXT_SHARE} from '../glocalization'

export default class Item extends React.Component{
  state={
    comment:"",
    modelActive:false
  }

  componentDidMount(){
    this.props.loadItem(this.props.name)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.name !== prevProps.name || !this.props.item.hasOwnProperty('content')) {
      this.props.loadItem(this.props.name)
    }
  }

  share(){
    this.props.writeSurl(this.props.name)
    this.setModalActive(true)
  }

  setModalActive(active=true){
    this.setState(update(this.state,{modelActive:{$set:active}}))
  }

  buildSurl(hash){
    const href=window.location.href
    const pos=href.indexOf("/","https://".length)
    return `${href.substring(0,pos)}${config.PUBLIC_URL}#/surl/${hash}`
  }

  render() {
    const {item,surl}=this.props
    if(item.hasOwnProperty('content')){
      return (
        <div>
          <nav className="media">
            <div className="media-content">
              <div className="content">        
                <h3 className="title is-3">{item.name}</h3>
              </div>
            </div>

            <div className="media-right">   
              <p>
                <a className="button is-small is-success" title={`Share '${item.name}'`} onClick={(e)=>this.share()}>{STRINGS.texts[TEXT_SHARE]}</a>
                &nbsp;&nbsp;
                <Link className="button is-small is-success" to={`/update/item/${item.name}`} title={`Update '${item.name}'`}>{STRINGS.texts[TEXT_UPDATE]}</Link>
              </p>
            </div>
          </nav>

          <hr/>
          <div className="content">
            <ReactMarkdown source={item.content} />              
          </div>    
          <hr/>
          <h5 className="subtitle is-5">{item.comments.length} comments</h5>
          <ul>
          {
            item.comments.map((comment)=>(
              <li key={comment.sha}>
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img src={comment.author.avatar_url} alt={comment.author.login}/>
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <a href={comment.author.html_url} target="_blank"><small>@{comment.author.login}</small></a>
                        <br/>
                        {comment.commit.message}
                      </p>
                    </div>
                  </div>
                </article>              
                <br/>
              </li>
            ))
          }            
          </ul>      
          <div className={`modal${this.state.modelActive?" is-active":""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div class={`control${surl?"":" is-loading"}`}>
                <input className="input is-large" value={surl?this.buildSurl(surl.hash):""} readOnly></input>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={e=>this.setModalActive(false)}></button>
          </div>          
        </div>   
      )  
    }else{
      return (
        <span className="icon is-large">
          <i className="fas fa-3x fa-spinner fa-pulse"></i>
        </span>
      )
    }
  }
}

Item.propTypes={
  name:PropTypes.string.isRequired,
  item:PropTypes.object.isRequired,
  loadItem: PropTypes.func.isRequired,
  writeSurl: PropTypes.func.isRequired
}