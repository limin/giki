/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import {createStore} from './helper'

test('createStore',()=>{
    const state=createStore().getState()
    expect(state).not.toBeNull()
    expect(state.session).not.toBeNull()
    expect(state.session.messages).not.toBeNull()
    expect(state.session.user).toBeNull()
    expect(state.files).not.toBeNull()
})