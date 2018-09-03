import React  from 'react'
import PropTypes from 'prop-types'
import SimpleMDE from 'react-simplemde-editor'
import {STRINGS, TEXT_SAVE} from '../glocalization'
import "simplemde/dist/simplemde.min.css"

export default class Item extends React.Component{
  state={
    text:"",
    initialized:false
  }

  componentDidMount(){
    this.props.loadItem(this.props.name)
  }

  handleChange = value => {
    this.setState({ 
      text: value,
      initialized: true
     })
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
      let text=this.state.initialized?this.state.text:item.content
      return (
        <div>
          <nav className="level">
            <div className="level-left">              
              <p className="level-item"><h5 class="subtitle is-5">{item.name}</h5></p>
            </div>

            <div className="level-right">
              <p className="level-item"><a className="button is-small is-success">{STRINGS.texts[TEXT_SAVE]}</a></p>
            </div>
          </nav>
          <SimpleMDE
            onChange={this.handleChange}
            value={text}
            options={options}
          />   
        </div>   
      )  
    }else{
      return (
        <span class="icon is-large">
          <i class="fas fa-3x fa-spinner fa-pulse"></i>
        </span>
      )
    }
  }
}

Item.propTypes={
  name:PropTypes.string.isRequired,
  loadItem: PropTypes.func.isRequired
}