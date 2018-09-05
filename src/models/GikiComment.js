import { struct } from 'superstruct'

const GikiComment = struct({
  commit:{
    sha:'string',
    message: 'string',
  },
  author:{
    "login": 'string',
    "avatar_url": 'string',
    "html_url":'string'
  }
})

export default GikiComment