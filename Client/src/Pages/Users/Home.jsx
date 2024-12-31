import React from 'react'
import HomePageNav from "../../components/HomePageNav"
import HeroSection from "../../components/HeroSection"
import MusicGallery from '../../components/MusicGallery'

const Home = () => {
  return (
    <div>
      <HomePageNav/>
      <HeroSection/>
      <MusicGallery/>
    </div>
  )
}

export default Home
