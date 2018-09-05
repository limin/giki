import * as config from '../config'
import Gikistore from './Gikistore'

let target=new Gikistore({
    username:config.GITHUB_USERNAME,
    repo:config.GITHUB_REPO,
    branch:config.GITHUB_BRANCH,
    extension:config.GIKI_FILENAME_EXTENSION
  })

//forward to all operations to target
let p= new Proxy(target, {
})

export default p
