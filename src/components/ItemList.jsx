/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import React from 'react'
import {Link} from 'react-router-dom'
import lunr from 'lunr'
import update from 'immutability-helper'
import {STRINGS,TEXT_SEARCH,TEXT_CREATE} from '../glocalization'

class ItemList extends React.Component{
  state={
    items:[],
    keywords:"",
    idx:null
  }
  search=(e)=>{
    const keywords=e.target.value
    const docs=this.state.idx.search(keywords)
    const items=docs.map((doc)=>this.props.items.filter((item)=>item.name===doc.ref)[0])
    this.setState(update(this.state,{items:{$set:items},keywords:{$set:keywords}}))
  }

  componentDidMount() {
    const {items}=this.props
    const idx = lunr(function () {
      this.field('name')
      for(const item of items){
        this.add({
          ...item,
          id:item.name
        })
      }
    })
    this.setState(update(this.state,{idx:{$set:idx}}))
    this.props.loadItems()
  }

  render(){
    let {items,keywords}=this.state
    if(keywords.length===0){
      //ensure the ui is updated when props.items is changed
      items=this.props.items
    }

    return (
      <div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input className="input" type="text" value={keywords} placeholder={STRINGS.texts[TEXT_SEARCH]} onChange={this.search}/>
                </p>
              </div>
            </div>
          </div>

          <div className="level-right">
            <p className="level-item"><Link className="button is-small is-success" to={"/create/item"}>{STRINGS.texts[TEXT_CREATE]}</Link></p>
          </div>
        </nav>
        <table className="table is-striped is-fullwidth">
          <tbody>
          {
            items.map((item)=>(
              <tr key={item.name}>
                <td>                
                <Link to={`/item/${item.name}`}>{item.name}</Link>                
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    )
  }
}


export default ItemList
