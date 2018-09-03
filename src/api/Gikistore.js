/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import * as config from '../config'
const GitHub=require('github-api')
const MASTER_BRANCH='master'
const FILENAME_EXTENSION=".md"


export default class Gikistore{
  constructor(){
    this.config={
      username:config.GITHUB_USERNAME,
      repo:config.GITHUB_REPO,
      password:config.GITHUB_PASSWORD,
      token:config.GITHUB_TOKEN      
    }
  }
  
  set config(conf){
    const {username,password,token,repo}=conf
    if(username && password){
      this.github=new GitHub({username,password})
    }else if(token){
      this.github=new GitHub({token})
    }else{
      throw new Error("Invalid Config.")
    }
    this.username=username
    this.repo=repo
  }

  itemFilter(file){
    return file.type==='file' && file.name.endsWith(FILENAME_EXTENSION)
  }

  itemMapper(file){
    return {
      ...file,
      name:file.name.substring(0,file.name.length-FILENAME_EXTENSION.length)
    }
  }

  createPromise(data){
    return new Promise(
      (res,rej)=>{
        try{
          return res(data)
        }catch(err){
          return rej(err)
        }
      }
    ) 
  }

  getUserProfile(username){
    const user=this.github.getUser(username||this.username)
    return user.getProfile().then((response)=>{
      return this.createPromise(response.data)
    })    
  }

  listItems(space="."){
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.getContents(MASTER_BRANCH,space).then((response)=>{
      return this.createPromise(response.data.filter(this.itemFilter).map(this.itemMapper))
    })
  }

  listComments(name){
    const path=`${name}${FILENAME_EXTENSION}`
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.listCommits({path}).then((response)=>{
      return this.createPromise(response.data)
    })    
  }

  readItem(name){
    const path=`${name}${FILENAME_EXTENSION}`    
    const repo=this.github.getRepo(this.username, this.repo)
    return Promise.all([repo.getContents(MASTER_BRANCH,path),repo.listCommits({path})]).then(([resp1,resp2])=>{
      const items=[resp1.data].filter(this.itemFilter).map(this.itemMapper)
      if(items.length===1){
        const item=items[0]
        item.content=window.atob(item.content)
        item.commits=resp2.data
        return this.createPromise(item)        
      }else{
        return this.createPromise(null)        
      }
    })
  }

  writeItem(name, content, message){
    const path=`${name}${FILENAME_EXTENSION}`    
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.writeFile(MASTER_BRANCH,path,content,message).then((response)=>{
      return this.createPromise(response.data)
    })
  }

  deleteItem(name){
    const path=`${name}${FILENAME_EXTENSION}`    
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.deleteFile(MASTER_BRANCH,path).then((response)=>{
      return this.createPromise(response.data)
    })
  }
}
