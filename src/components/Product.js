import React from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getDerivedProducts} from '../selectors'
import {STRINGS,TEXT_ID,TEXT_NAME,TEXT_DESCRIPTION,TEXT_PRODUCT,TEXT_UPDATE,TEXT_FUNCTIONS} from '../glocalization'

class Product extends React.Component{
  render(){
    let {product,session}=this.props
    if(product==null || product.deleted===true){
      return (
          <div>
          Page not found.
          </div>
      )
    }
    return (
      <div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{STRINGS.texts[TEXT_PRODUCT]}</strong>
              </p>
            </div>
          </div>

          <div className="level-right">
            {session.user.permissions.indexOf('UpdateProduct')>=0 &&  <p className="level-item"><Link className="button is-small is-success" to={"/update/p/"+product._id}>{STRINGS.texts[TEXT_UPDATE]}</Link></p>}
          </div>
        </nav>
        <table className="table is-striped">
          <tbody>
            <tr>
              <th>{STRINGS.texts[TEXT_ID]}</th>
              <td>{product._id}</td>
            </tr>
            <tr>
              <th>{STRINGS.texts[TEXT_NAME]}</th>
              <td>{product.name}</td>
            </tr>
            <tr>
              <th>{STRINGS.texts[TEXT_DESCRIPTION]}</th>
              <td>{product.description}</td>
            </tr>
            <tr>
              <th>{STRINGS.texts[TEXT_FUNCTIONS]}</th>
              <td>
                <aside className="menu">
                  <ul className="menu-list">
                  {
                    product.functions.map((fun)=>(
                      <li key={fun._id}><a>{fun.name}</a></li>
                    )
                  )}
                  </ul>
                </aside>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps({organizations,products,functions,session},{id}){
  const pList=getDerivedProducts({products,functions,organizations}).filter(p=>p._id===id)
  return{
    product:pList.length===0?null:pList[0],
    session
  }
}

export default withRouter(connect(mapStateToProps)(Product))
