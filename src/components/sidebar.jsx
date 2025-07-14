import React from 'react'
import './yt.css'
import logoo from '../assets/pro.png'
function Sidebar() {
  return (
    <div className='sidebar'>
      
      <div className="main">
      <div>
       <a href="#" className='logo'>
        <img src={logoo} alt="logo" className="logoo" />
        </a>

      </div>

        <div className="comp">
        <section className='sec1'>
          <button className="bton">Home</button>
          <button className="bton">Shorts</button>
          <button className="bton">Subscription</button>
        </section>
      
        </div>
        <div className='comp'>
          <section className='sec2'>
            <h2>You &gt;</h2>
            <button className="bton">History</button>
            <button className="bton">Playlist</button>
            <button className="bton">Your videos</button>
            <button className="bton">Your course</button>
            <button className="bton">Watch Later</button>
            <button className="bton">Liked videos</button>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
