import { struct } from 'superstruct'

const GikiItem = struct({
  size: 'number',  
  name: 'string',
  path: 'string',
  content: 'string',
  commits: ['object']
})

export default GikiItem