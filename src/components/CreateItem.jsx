import React  from 'react'
import PropTypes from 'prop-types'
import SimpleMDE from 'react-simplemde-editor'
import update from 'immutability-helper'
import {STRINGS, TEXT_CREATE} from '../glocalization'
import InputField from './InputField'
import "simplemde/dist/simplemde.min.css"

export default class CreateItem extends React.Component{
  state={
    name:"",
    content:"",
    comment:"",
    modalActive:false
  }

  create(){
    this.props.create({name:this.state.name,content:this.state.content},this.state.comment)
    this.updateState('modalActive',false)
    this.props.history.go(-1)
  }

  isItemValid(){
    return this.state.name.length>0 && this.state.content.length>0
  }

  updateState(name,value){
    const state=update(this.state,{[name]:{$set:value}})
    this.setState(state)
  }

  render() {
    const options={
      autofocus:true,
      toolbar: ["bold", "italic","strikethrough", "heading",
      "code","quote","unordered-list","ordered-list","link",
      "image","table","horizontal-rule","preview"]
    }
    return (
      <div>
        <nav className="media">
          <div class="media-content">
            <div class="content">        
              <InputField name="name" value={this.state.name} type="text" placeholder="Input the name" onChange={(value)=>this.updateState('name',value)}/>
            </div>
          </div>

          <div className="media-right">
            <p><a className="button is-small is-success" onClick={e=>this.updateState('modalActive',this.isItemValid())} disabled={!this.isItemValid()}>{STRINGS.texts[TEXT_CREATE]}</a></p>
          </div>
        </nav>
        <br/>
        <SimpleMDE
          onChange={(value)=>this.updateState('content',value)}
          value={this.state.content || ""}
          options={options}
        />  

        {this.state.modalActive && 
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Comment</p>
              <button className="delete" aria-label="close" onClick={e=>this.updateState('modalActive',false)}></button>
            </header>
            <section className="modal-card-body">
            <div className="field">
              <div className="control">
                <SimpleMDE
                  onChange={(value)=>this.updateState('comment',value)}
                  value={this.state.comment || ""}
                  options={options}
                />                  
              </div>
            </div>              
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={e=>this.create()}>Submit</button>
              <button className="button" onClick={e=>this.updateState('modalActive',false)}>Cancel</button>
            </footer>
          </div>
        </div>           
        }
      </div>   
    )  
  }
}

CreateItem.propTypes={
  session:PropTypes.object.isRequired,
  history:PropTypes.object.isRequired
}