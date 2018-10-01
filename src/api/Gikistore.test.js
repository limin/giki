/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import fs from 'fs'
import dotenv from 'dotenv'
import Gikistore from './Gikistore'

describe('Gikistore API',()=>{
    let gikistore=null
    beforeAll(()=>{
        const localenv = dotenv.parse(fs.readFileSync('.env.local'))        
        gikistore=new Gikistore()
        gikistore.config={
            username: localenv.GITHUB_USERNAME,
            repo: localenv.GITHUB_REPO,
            token: localenv.GITHUB_TOKEN,
        }
    })
    test('listItems',(done)=>{
        gikistore.listItems(".").then((response)=>{
            expect(response.status===200)
            done()
        })
        
    })

})