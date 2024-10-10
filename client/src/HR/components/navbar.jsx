import React from 'react'
import { Link } from 'react-router-dom'

function nav() {
  return (
    <div>
      <header>
        <div className='nav'>
          <div className="logo">Mylogo</div> 
          <ul>
            <li>
              <Link to="/dashboard">Dashbord</Link>
              <Link to="/createcost">Create cost</Link>
              <Link to="/repost">Repost</Link>
            </li>
            <li>
              <Link to="/" id='out'>Logout</Link>
            </li>
          </ul>   
        </div>
      </header>
    </div>
  )
}

export default nav
