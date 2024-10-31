import React from 'react'
import toast ,{Toaster} from 'react-hot-toast'
import { useRecoilValue } from 'recoil'
import { loadingAtom } from '../Atoms/Atoms'
import Navbar from './Navbar'
import Board from './Board'
import Options from './Options'
import '../Styles/Hero.css'
import '../Styles/loader.css'

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
  const isLoading=useRecoilValue(loadingAtom);
  return (
    <div className='HeroPage'> 
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Navbar/>
   <Between/>  
    <Board toast={toast}/>
    <Options/>
    {isLoading?<Loader/>:null}
    <div className='space'>work in progress!!</div>
    </div>
  )
}

export default Hero
