import uuid from 'uuid'
import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
PouchDB.plugin(PouchFind)

export default class Pouchstore{
  constructor(name,docs=[],options={}){
    this.db = new PouchDB(name,options)
    this.db.createIndex({
      index: {fields: ['type']}
    })
    if(docs.length>0){
      this.db.bulkDocs(docs)
    }
  }

  load(type){
    return this.db.find({
      selector:{
        type
      }
    }).then(res=>res.docs)
  }

  create(obj,type){
    const o={
      _id:uuid.v1(),
      ...obj,
      type
    }
    return this.db.put(o).then((res)=>{
      o._rev=res.rev
      return o
    })
  }

  update(obj,id){
    const o={
      ...obj,
      _id:id
    }
    return this.db.put(o).then((res)=>{
      o._rev=res.rev
      return o
    })
  }
}
