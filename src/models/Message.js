/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import { struct } from 'superstruct'

const Message = struct({
  name: 'string',
  level: struct.enum(['info', 'warning', 'success', 'danger'])
})

export default Message