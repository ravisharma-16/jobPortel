import React from 'react'
import Navbar from '../component/navbar'
import Header from './Header'
import Mainbody from './mainbody'
import Latestjob from './latestjob'
import Footer from './footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Mainbody />
      <Latestjob />
      <Footer />
    </div>
  )
}

export default Home
