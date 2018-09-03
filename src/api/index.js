import * as config from '../config'
import Gikistore from './gikistore';

let target=new Gikistore()

//forward to all operations to target
let p= new Proxy(target, {
})

export default p
