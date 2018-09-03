/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import Gikistore from '../api/Gikistore'

export const ITEMS_RECEIVED='ITEMS_RECEIVED'

export function itemsReceived(items){
	return {
    	type: ITEMS_RECEIVED,
    	items
    }
}

export function loadItems(space="."){
	return function(dispatch){
		const gikistore=new Gikistore()
		gikistore.listItems(space).then((items)=>{
			dispatch(itemsReceived(items))
		})
	}
}

export function loadItem(name){
	return function(dispatch){
		const gikistore=new Gikistore()
		gikistore.readItem(name).then((item)=>{
			dispatch(itemsReceived([item]))
		})
	}
}
