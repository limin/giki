import React  from 'react'
import PropTypes from 'prop-types'
import SimpleMDE from 'react-simplemde-editor'
import update from 'immutability-helper'
import {STRINGS, TEXT_SAVE} from '../glocalization'
import "simplemde/dist/simplemde.min.css"

export default class UpdateItem extends React.Component{
  state={
    comment:"",
    modalActive:false
  }

  componentDidMount(){
    this.props.loadItem(this.props.name)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.name !== prevProps.name) {
      this.props.loadItem(this.props.name)
    }
  }
    

  save(){
    this.props.save(this.props.item,this.state.comment)
    this.setModalActive(false)
    this.props.history.go(-1)    
  }

  setModalActive(active=true){
    const state=update(this.state,{modalActive:{$set:active}})
    this.setState(state)
  }

  handleCommentChange(value){
    const state=update(this.state,{comment:{$set:value}})
    this.setState(state)
  }

  handleContentChange(value) {
    this.props.item.content=value
  }

  render() {
    const {item}=this.props
    const options={
      autofocus:true,
      toolbar: ["bold", "italic","strikethrough", "heading",
      "code","quote","unordered-list","ordered-list","link",
      "image","table","horizontal-rule","preview"]
    }
    if(item.hasOwnProperty('content')){
      return (
        <div>
          <nav className="level">
            <div className="level-left">              
              <p className="level-item"><h5 className="subtitle is-5">{item.name}</h5></p>
            </div>

            <div className="level-right">
              <p className="level-item"><a className="button is-small is-success" onClick={e=>this.setModalActive(true)}>{STRINGS.texts[TEXT_SAVE]}</a></p>
            </div>
          </nav>
          <SimpleMDE
            onChange={(value)=>this.handleContentChange(value)}
            value={item.content || ""}
            options={options}
          />  

          {this.state.modalActive && 
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Comment</p>
                <button className="delete" aria-label="close" onClick={e=>this.setModalActive(false)}></button>
              </header>
              <section className="modal-card-body">
              <div className="field">
                <div className="control">
                  <SimpleMDE
                    onChange={(value)=>this.handleCommentChange(value)}
                    value={this.state.comment || ""}
                    options={options}
                  />                  
                </div>
              </div>              
              </section>
              <footer className="modal-card-foot">
                <button className="button is-success" onClick={e=>this.save()}>Submit</button>
                <button className="button" onClick={e=>this.setModalActive(false)}>Cancel</button>
              </footer>
            </div>
          </div>           
          }
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

UpdateItem.propTypes={
  name:PropTypes.string.isRequired,
  item:PropTypes.object.isRequired,
  loadItem: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}