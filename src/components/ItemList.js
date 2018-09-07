import {connect} from 'react-redux'
import ItemList from './ItemList.jsx'

function mapStateToProps({items,session}){
  return {
    items:Object.values(items).reverse(),
    session
  }
}

export default connect(mapStateToProps)(ItemList);
