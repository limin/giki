/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

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

  listComments(name){
    const path=`${name}${this.extension}`
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.listCommits({path}).then((response)=>{
      return this.createPromise(response.data)
    })    
  }

  readItem(name){
    const path=`${name}${this.extension}`    
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

  readRawFile(name){
    const url=`https://raw.githubusercontent.com/${this.username}/${this.repo}/${this.branch}/${name}${this.extension}`
    return fetch(url).then(response=>{
      if(response.status===404){
        throw new Error("File not found")
      }
      return response.text()
    })
  }

  writeItem(name, content, message){
    const path=`${name}${this.extension}`    
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.writeFile(this.branch,path,content,message,{}).then((response)=>{
      return this.createPromise(response.data)
    })
  }

  deleteItem(name){
    const path=`${name}${this.extension}`    
    const repo=this.github.getRepo(this.username, this.repo)
    return repo.deleteFile(this.branch,path).then((response)=>{
      return this.createPromise(response.data)
    })
  }
}