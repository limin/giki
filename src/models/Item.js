/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import { struct } from 'superstruct'

const Item = struct(
  {
    name: 'string',
    path: 'string',
    sha:'string',
    content: 'string',
    commits: ['object'],
    tags:['string']
  }
)

export default Item