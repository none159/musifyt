import React from 'react'
import headerimg from '../images/listening-to-music.jpeg'
import listen from '../images/Screenshot at Jan 15 21-09-04.png'
import login from '../images/Screenshot at Jan 15 20-13-09.png'
import playlist from '../images/Screenshot at Jan 15 20-15-07.png'
import easy from '../images/easy.png'
import fast from '../images/fast-delivery.png'
import noads from '../images/no.png'
const Hero = ()=>{
    return(
        <section>
            <div className='hero-container'>
               <img src={headerimg} className='headerimg'></img>
               <h2 className='headertext'>Listen to your fav song<br></br>
                      without using an app
               </h2>
               <div className='hero-imgs'>
                  <div >
                      <h2>Listen to your selected songs using just the url of the video.</h2>
                      <img src={listen}></img>
                  </div>
                  <div>
                      <h2>Create different playlist of your choice by clicking add to the playlist.</h2>
                      <img src={playlist}></img>
                  </div>
               </div>
               <div className='hero-features'>
                  <div>
                      <img src={fast}></img>
                      <h2> Fast </h2>
                    
                  </div>
                  <div>
                      <img src={easy}></img>
                      <h2>Easy to use</h2>
                  </div>
                  <div>
                      <img src={noads}></img>
                      <h2>No Ads</h2>
                      
                  </div>
                </div>
            </div>
        </section>
    )
}
export default Hero;