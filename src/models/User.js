import { struct } from 'superstruct'

const User = struct({
  username: 'string',
  password: 'string'
})

export default User