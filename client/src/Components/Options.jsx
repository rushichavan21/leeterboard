import React from 'react'
import '../Styles/Options.css'

const Options = () => {
  return (
    <div className='optionsWrapper container'>
  <div className="create">
    <h3>Create</h3>
    <button className='Buttons'>Private Room</button>
    <button className='Buttons'>Public Room</button>
  </div>
  <div className="moreFeatures">
    <h3>More features</h3>
    <button className='Buttons'>profile Roaster</button>
    <button className='Buttons'>Generate snap</button>
  </div>
    </div>
  )
}

export default Options
