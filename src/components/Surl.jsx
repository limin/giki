import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'


export default class Surl extends Component{
    componentDidMount(){
        this.props.readSurl(this.props.hash)
      }
    
      componentDidUpdate(prevProps) {
        if (this.props.hash !== prevProps.hash) {
          this.props.readSurl(this.props.hash)
        }
      }
    
    render(){
        const {surl}=this.props
        return surl?
            <Redirect to={`/view/item/${surl.name}`} />
            :
            (
            <span className="icon is-large">
                <i className="fas fa-3x fa-spinner fa-pulse"></i>
            </span>
            )
    }
}