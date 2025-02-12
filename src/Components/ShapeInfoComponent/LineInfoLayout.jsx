// import React from 'react'
import PointInput from '../HelperComponents/PointInput'

function LineInfoLayout() {
  return (
    <>
    <div className="position">
        <div className="label my-2 bold-roboto">Starting Point</div>
        <PointInput />
        <div className="label my-2 bold-roboto">Ending Point</div>
        <PointInput />
      </div>
    
    
    
    </>
  )
}

export default LineInfoLayout