import React  from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

export default class ViewItem extends React.Component{
  componentDidMount(){
    this.props.readRawFile(this.props.name)
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name || !this.props.item.hasOwnProperty('content')) {
      this.props.readRawFile(this.props.name)
    }
  }

  render() {
    const {item}=this.props
    if(item.hasOwnProperty('content')){
      return (
        <div>
          <h3 className="title is-3">{item.name}</h3>
          <hr/>
          <div className="content">
            <ReactMarkdown source={item.content} />              
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