/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import { struct } from 'superstruct'

const Commit = struct({
  sha:'string',
  message: 'string',
  author:{
    "login": 'string',
    "avatar_url": 'string',
    "html_url":'string'
  }
})



export default Commit