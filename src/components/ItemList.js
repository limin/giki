import {connect} from 'react-redux'
import ItemList from './ItemList.react'

function mapStateToProps({items,session}){
  return {
    items:Object.values(items),
    session
  }
}

export default connect(mapStateToProps)(ItemList);
