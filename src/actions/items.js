/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {gikistore} from '../api'

export const ITEMS_RECEIVED='ITEMS_RECEIVED'
export const ITEMS_LOADING='ITEMS_LOADING'
export const ITEM_LOADING='ITEM_LOADING'

export function itemsReceived(items){
	return {
    	type: ITEMS_RECEIVED,
    	items
    }
}

export function itemsLoading(space){
	return {
		type: ITEMS_LOADING,
		space
    }
}

export function itemLoading(name,space){
	return {
		type: ITEM_LOADING,
		name,
		space
    }
}

export function loadItems(space="."){
	return function(dispatch){
		gikistore.listItems(space).then((items)=>{
			dispatch(itemsReceived(items))
		})
	}
}

export function loadItem(name,space="."){
	return function(dispatch){
		gikistore.readItem(name,space).then((item)=>{
			dispatch(itemsReceived([item]))
		})
	}
}

export function readRawFile(name,space="."){
	return function(dispatch){
		gikistore.readRawFile(name,space).then((content)=>{
			const item={name,content}
			dispatch(itemsReceived([item]))
		})
	}
}



export function writeItem(item,message){
	const {name,content,space="."}=item
	return function(dispatch){
		gikistore.writeItem(name,content,message,space).then((data)=>{
			//since there is a delay in git to commit the changes,
			// loadItem won't return the new updated item, 
			// dispatch(loadItem(name)) won't work here. 
			// Manually set comments empty comments for new item as a workaround.
			if(!item.comments) item.comments=[]
			dispatch(itemsReceived([item]))
		})
	}
}

export function writeIndex(items,message,space="."){
	return function(dispatch){
		gikistore.writeIndex(items,message,space).then((data)=>{
			console.log(`index is updated:${message}`)
		})
	}
}
