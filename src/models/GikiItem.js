import { struct } from 'superstruct'

const GikiItem = struct({
  name: 'string',
  content: 'string',
  comments: ['object']
})

export default GikiItem