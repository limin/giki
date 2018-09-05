import React  from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

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
    if (this.props.name !== prevProps.name) {
      this.props.loadItem(this.props.name)
    }
  }

  render() {
    const {item}=this.props
    if(item.hasOwnProperty('content')){
      return (
        <div>
          <Link className="title is-3 has-text-link" to={`/update/item/${item.name}`} title={`Update '${item.name}'`}>{item.name}</Link>                       
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
  loadItem: PropTypes.func.isRequired
}