import { struct } from 'superstruct'

const Message = struct({
  name: 'string',
  level: struct.enum(['info', 'warning', 'success', 'danger'])
})

export default Message