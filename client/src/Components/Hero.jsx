import React from 'react'
import toast ,{Toaster} from 'react-hot-toast'
import '../Styles/Hero.css'
import Navbar from './Navbar'
import LeetCodeProfile from './LeetCodeProfile'
import Options from './Options'
import Board from './Board'
import Card from './Card'
import '../Styles/loader.css'
import { useState } from 'react'

const Between=()=>{
return (
  <div className="between container">
<img src="./trophy.svg" alt="image" />
<h1>Leeter Board</h1>
<img src="./trophy.svg" alt="image" />
    </div>
)


}
const Loader=()=>{
  return(
    
    <div className="loaderDiv">
    <div className="loader"></div>
    <h3>Loading...</h3>
    </div>

  )
}

const Hero = () => {
  const [isLoading,setIsLoading]=useState(0);
  return (
    <div className='HeroPage'> 
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Navbar/>
   <Between/>  
    <Board isLoading={isLoading} setIsLoading={setIsLoading} toast={toast}/>
    <Options/>
    {isLoading?<Loader/>:null}
    <div className='space'>work in progress!!</div>
    </div>
  )
}

export default Hero
