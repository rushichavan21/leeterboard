import React from 'react'
import { useRecoilValue } from 'recoil'
import { loadingAtom } from '@/Atoms/Atoms'
import "./vjticustom.css"
 '../../Styles/loader.css'
import NewNav from '@/Components/Navbar/Navbar'
import Slider from '@/Components/Slider/Slider'
import Halo from '@/Components/Halo/Halo'
import NewBoard from './NewBoard'
import { Toaster } from '@/Components/ui/toaster'
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
    <div className='newhome--wrapper'>
      <NewNav/>
      <div className="sidebar--div"> 
    <Slider/>
    </div>
    <div className="vjti-content">
    {isLoading?<Loader/>:null}
    <Halo/>
    <NewBoard/>
    </div>
    <Toaster/>
    </div>
  )
}

export default VjtiCustom