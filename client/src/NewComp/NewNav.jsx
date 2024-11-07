import React from 'react'
import '../Styles/NewHome.css'
import { Button } from '@/Components/ui/button'
import { ModeToggle } from '@/Components/ModeToggle'


const NewNav = () => {
  return (
    <div className='newNav--wrapper'>
        <div className="newNav--logo">
            <img src="/logo.svg" alt="logo" />
            <h3>LeeterBoard</h3>
        </div>
        <ModeToggle className="modeSwitch"/>
    </div>
  )
}

export default NewNav
