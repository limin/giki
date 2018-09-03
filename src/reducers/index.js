/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {combineReducers } from 'redux'
import session from './session'
import items from './items'
import users from './users'

export default combineReducers({session,users,items})
