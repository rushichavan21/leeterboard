import React from 'react'
import "./vjticustom.css"
import NewNav from '@/Components/Navbar/Navbar'
import Slider from '@/Components/Slider/Slider'
import Halo from '@/Components/Halo/Halo'
import NewBoard from './NewBoard'

const VjtiCustom = () => {
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