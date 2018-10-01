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

//forward to all operations to target
export const gikistore= new Proxy(new Gikistore({
  username:config.GITHUB_USERNAME,
  repo:config.GITHUB_REPO,
  branch:config.GITHUB_BRANCH,
  extension:config.GIKI_FILENAME_EXTENSION
}), {})
export const pouchstore=new Proxy(new Pouchstore(config.POUCHSTORE_NAME),{})
