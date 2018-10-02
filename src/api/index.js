/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import * as config from '../config'
import Gikistore from './Gikistore'
import Pouchstore from './Pouchstore'

const gstore=new Gikistore({
  username:config.GITHUB_USERNAME,
  repo:config.GITHUB_REPO,
  branch:config.GITHUB_BRANCH,
  extension:config.GIKI_FILENAME_EXTENSION
})
try{
  const authorization=JSON.parse(window.sessionStorage.getItem("authorization"))
  if(authorization && authorization.username && authorization.password){
    gstore.authorization=authorization
  }
}catch(e){
  console.error(e)
}
//forward to all operations to target
export const gikistore= new Proxy(gstore, {})
export const pouchstore=new Proxy(new Pouchstore(config.POUCHSTORE_NAME),{})
