/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


export const USERS_RECEIVED='USERS_RECEIVED'

export function usersReceived(users){
	return {
    	type: USERS_RECEIVED,
    	users
    }
}

