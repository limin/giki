/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import React from 'react'
import {STRINGS} from '../glocalization'

export default class InputField extends React.Component{
    render(){
        const {value,label,name,placeholder,message,onChange, type="text"}=this.props
        return (
            <div className="field">
            {label && <label className="label">{label}</label>}
            <div className={`control ${message?"has-icons-right":""}`}>
                <input className={`input ${message?"is-danger":""}`} name={name} value={value} type={type} placeholder={placeholder} onChange={(e)=>onChange(e.target.value)}/>
                {
                message &&
                    <span className="icon is-small is-right">
                    <i className="fa fa-warning"></i>
                    </span>
                }
            </div>
            {            
                message && <p className={`help is-${message.level}`}>{STRINGS.messages[message.name]}</p>
            }
            </div>
        )
    }
}