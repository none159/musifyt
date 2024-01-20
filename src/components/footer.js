import React from 'react'
import { Link } from 'react-router-dom'
const Footer = ()=>{
    return(
      <footer>
          <div className='footer-container'>
              <div className='footer-links'>
              <Link to='/about'><h2>About</h2></Link>
              <Link to='/musifyt'> <h2>Home</h2></Link>
              <Link to='/music'> <h2>Music</h2></Link>
              </div>
              <div className='other-info'>
                  <h2>Adresse Email : noneenonee019@gmail.com</h2>
              </div>
          </div>
      </footer>
    )
}
export default Footer