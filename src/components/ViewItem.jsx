/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import React  from 'react'
import PropTypes from 'prop-types'

export default class ViewItem extends React.Component{
  componentDidMount(){
    this.props.readRawFile(this.props.name)
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name || !this.props.item.hasOwnProperty('content')) {
      this.props.readRawFile(this.props.name)
    }
  }
  //required by react: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
  createMarkup(html) {
    return {__html: html};
  }  

  render() {
    const {item}=this.props
    if(item.hasOwnProperty('content')){
      return (
        <div>
          <h3 className="title is-3">{item.name}</h3>
          <hr/>
          <div className="content">
            <div dangerouslySetInnerHTML={this.createMarkup(require('marked')(item.content))} />
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

ViewItem.propTypes={
  name:PropTypes.string.isRequired,
  item:PropTypes.object.isRequired,
  readRawFile: PropTypes.func.isRequired
}