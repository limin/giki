/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

 import {stringMd5} from 'pouchdb-md5'
const GitHub=require('github-api')

export default class Gikistore{  
  constructor({username,repo,branch,extension}){
    this.username=username
    this.repo=repo
    this.branch=branch
    this.extension=extension
  }
  set authorization(authorization){
    const {username,password,token}=authorization
    if(username && password){
      this.github=new GitHub({username,password})
    }else if(token){
      this.github=new GitHub({token})
    }else{
      throw new Error("Invalid authorization.")
    }
  }

  filtFile(file){
    return file.type==='file' && file.name.endsWith(this.extension)
  }

  mapFile(file){
    return {
      ...file,
      name:file.name.substring(0,file.name.length-this.extension.length)
    }
  }

  buildItemPath(name,space){
    return `${space}/${name}${this.extension}`        
  }

  buildSurlPath(hash,space="."){
    return `${space}/.surl/${hash}.json`
  }

  buildIndexPath(space="."){
    return `${space}/index.json`
  }

  buildMetaPath(name,space){
    return `${space}/.meta/${name}.json`        
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
    return repo.getContents(this.branch,space).then((response)=>{
      return this.createPromise(response.data.filter(file=>this.filtFile(file)).map(file=>this.mapFile(file)))
    })
  }

  listComments(name,space="."){
    const path=this.buildItemPath(name,space)
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.listCommits({path}).then((response)=>{
      return this.createPromise(response.data)
    })    
  }

  readItem(name,space="."){
    const path=this.buildItemPath(name,space)    
    const repo=this.github.getRepo(this.username, this.repo)
    return Promise.all([repo.getContents(this.branch,path),repo.listCommits({path})]).then(([resp1,resp2])=>{
      const items=[resp1.data].filter(file=>this.filtFile(file)).map(file=>this.mapFile(file))
      if(items.length===1){
        const item=items[0]
        item.content=window.atob(item.content)
        item.comments=resp2.data
        return this.createPromise(item)        
      }else{
        return this.createPromise(null)        
      }
    })
  }

  readRawFile(name,space="."){
    const url=`https://raw.githubusercontent.com/${this.username}/${this.repo}/${this.branch}/${this.buildItemPath(name,space)}`
    return fetch(url).then(response=>{
      if(response.status===404){
        throw new Error("File not found")
      }
      return response.text()
    })
  }

  writeIndex(names,message,space="."){
    const path=this.buildIndexPath(space)
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.writeFile(this.branch,path,JSON.stringify(names),message,{}).then((response)=>{
      return this.createPromise(response.data)
    })    
  }
  //e.g. tag #restful api#javascript#-nodejs#react#:add tags of the document
  //+: add tag. optional
  //-: remove tag. required
  parseMessage(message){
    const regexp=/^tag\s+((#[+-]?[\s\w]*)+):/gim
    const matches=message.matches(regexp)
    const tags=[]
    if(matches.length===3){
      matches[1].split("#").forEach(tag=>{
        if(tag.trim().length>0){
          //TODO. add or remove check
        }
      })
    }
    return tags
  }
  writeItem(name, content, message,space="."){
    const path=this.buildItemPath(name,space)
    const repo=this.github.getRepo(this.username, this.repo)
    //empty options is required to work around the bugs in the api
    //TODO: parse message and write meta too
    return repo.writeFile(this.branch,path,content,message,{}).then((response)=>{
      return this.createPromise(response.data)
    })
  }

  readSurl(hash,space="."){
    const url=`https://raw.githubusercontent.com/${this.username}/${this.repo}/${this.branch}/${this.buildSurlPath(hash,space)}`
    return fetch(url).then(response=>{
      if(response.status===404){
        throw new Error("File not found")
      }
      return response.json()
    })
  }

  writeSurl(name,space="."){
    //only take first 10 chars
    const hash=stringMd5(name).substring(0,10)
    const path=this.buildSurlPath(hash,space)    
    const repo=this.github.getRepo(this.username, this.repo)
    const surl={
      hash,
      name,
      space,
      timestamp:Date.now()
    }
    return repo.writeFile(this.branch,path,JSON.stringify(surl),`surl ${name}`,{}).then((response)=>{
      if(response.status===200){
        return this.createPromise(surl)
      }else{
        throw new Error(response.status)                                                                                                                                                                                            
      }
    })
  }

  deleteItem(name,space="."){
    const path=this.buildItemPath(name,space)    
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.deleteFile(this.branch,path).then((response)=>{
      return this.createPromise(response.data)
    })
  }
}