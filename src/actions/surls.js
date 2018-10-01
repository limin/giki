/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {gikistore} from '../api'

export const SURLS_RECEIVED='SURLS_RECEIVED'

export function surlsReceived(surls){
	return {
    	type: SURLS_RECEIVED,
    	surls
    }
}

export function readSurl(hash){
	return function(dispatch){
		gikistore.readSurl(hash).then((surl)=>{
			dispatch(surlsReceived([surl]))
		})
	}
}

export function writeSurl(name){
	return function(dispatch){
		gikistore.writeSurl(name).then((surl)=>{
			dispatch(surlsReceived([surl]))
		})
	}
}