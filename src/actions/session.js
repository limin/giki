/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import Gikistore from '../api/Gikistore'
import {MESSAGE_INVALID_LOGIN} from '../glocalization'
import {loadItems} from './items'

export const LANGUAGE_CHANGED='LANGUAGE_CHANGED'
export const MESSAGES_DELETED='MESSAGES_DELETED'
export const MESSAGES_RECEIVED='MESSAGES_RECEIVED'
export const USER_LOGGED_IN='USER_LOGGED_IN'
export const USER_LOGGED_OUT='USER_LOGGED_OUT'

const gikistore=new Gikistore()

export function userLoggedOut(){
	return {
    	type: USER_LOGGED_OUT
    }
}

export function userLoggedIn(user){
	return {
    	type: USER_LOGGED_IN,
    	user
    }
}

export function messagesDeleted(names){
	return {
    	type: MESSAGES_DELETED,
    	names
    }
}

export function messagesReceived(messages){
	return {
    	type: MESSAGES_RECEIVED,
    	messages
    }
}

export function languageChanged(language){
	return {
    	type: LANGUAGE_CHANGED,
    	language
    }
}

export function login(username,password){
	return function(dispatch){
		gikistore.config={
			username,
			password,
			repo:gikistore.repo
		}
		gikistore.getUserProfile().then(user=>{
			dispatch(userLoggedIn(user))
			dispatch(messagesDeleted([MESSAGE_INVALID_LOGIN]))
			dispatch(loadItems())
		},err=>{
			dispatch(messagesReceived([{name:MESSAGE_INVALID_LOGIN,level:"warning"}]))
		})
	}
}