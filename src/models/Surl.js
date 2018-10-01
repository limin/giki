/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import { struct } from 'superstruct'

const Surl = struct(
  {
    space:'string',
    name: 'string',
    hash: 'string',
    timestamp: 'number'
  },
  {
    space:'.'
  }
)

export default Surl
