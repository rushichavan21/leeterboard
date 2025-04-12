import React from 'react'
import { useRecoilValue } from 'recoil'
import { loadingAtom } from '@/Atoms/Atoms'
import "./vjticustom.css"
import NewNav from '@/Components/Navbar/Navbar'
import Slider from '@/Components/Slider/Slider'
import Halo from '@/Components/Halo/Halo'
import NewBoard from './NewBoard'
const Loader=()=>{
  return(
    
    <div className="loaderDiv">
    <div className="loader"></div>
    <h3>Loading...</h3>
    </div>

  )
}

const VjtiCustom = () => {
    const isLoading=useRecoilValue(loadingAtom);
  return (
    <div className='vjti--wrapper'>
      <NewNav/>
      <div className="sidebar--div"> 
    <Slider/>
    </div>
    <div className="vjti-content">
    {/* <Halo/> */}
    <NewBoard/>
    </div>
    </div>
  )
}

export default VjtiCustom