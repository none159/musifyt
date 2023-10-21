import React from 'react'
import home from '../images/home-page.png'
import music from '../images/headphone.png'
import info from '../images/infos.png'
import {Link} from 'react-router-dom'
const Nav = ()=>{
    return(
    <>
        <div className='title'>
        <h2>Musifyt</h2>
    </div>
     <nav>
         <div className='nav-container'>
             
                <div className='links' id='links'>
                    <div className='link' id='home-link'>
                    <Link to='/'><img src={home}></img></Link>
                    <h2>Home</h2>
                    </div>
                    <div className='link' id='music-link'>
                    <Link to='/music'><img src={music}></img></Link>
                        <h2>Music</h2>
                    </div>
                    <div className='link' id='info-link'>
                    <Link to='/about'><img src={info}></img></Link>
                        <h2>About</h2>
                    </div>
                </div>
            
         </div>
     </nav>
    </>
    )
}
export default Nav