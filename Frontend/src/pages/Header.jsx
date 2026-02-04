import React from 'react'
import TypingText from './Typing'
import '../pages/Header.css'

const Header = () => {
  return (
    <>
 <div className="text">
  <h1 className="header">
    <TypingText text="Search Apply &" speed={100} />
  </h1>

  <h2 className="header2">
    <TypingText text="Get Your Dream Job" speed={50} />
  </h2>
  <h6 className='header3'>
    <TypingText text="Start your hunt for the best, life-changing career opportunities" speed={30} />
  </h6>
  <h6 className='header3'>
    <TypingText text="from here in your
selected areas conveniently and get hired quickly." speed={30} />
  </h6>
</div>
  <div>
    <input type="text" placeholder='Find your Dream Job' className='inputbox'/>
    <button className='search-btn'>search</button>
  </div>
  </>

  )
}

export default Header
