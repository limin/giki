/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import {connect} from 'react-redux'
import ItemList from './ItemList.jsx'

function mapStateToProps({items,session}){
  return {
    items:Object.values(items).reverse(),
    session
  }
}

export default connect(mapStateToProps)(ItemList);
