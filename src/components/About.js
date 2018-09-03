/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

import React from 'react'
import * as config from '../config'

class About extends React.Component{
  render(){
    return (
      <div className="about">
        <div className="title">
          Application Information
        </div>
        <div className="body">
          <table className="table is-striped">
            <tbody>
              <tr>
                <th>env</th>
                <td>{config.NODE_ENV}</td>
              </tr>
              <tr>
                <th>app name</th>
                <td>{config.REACT_APP_NAME}</td>
              </tr>
              <tr>
                <th>app version</th>
                <td>{config.REACT_APP_VERSION}</td>
              </tr>
              <tr>
                <th>app basename</th>
                <td>{config.PUBLIC_URL}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default About
