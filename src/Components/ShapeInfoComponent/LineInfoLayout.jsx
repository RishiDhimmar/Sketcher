// import React from 'react'
import PointInput from '../HelperComponents/PointInput'

// eslint-disable-next-line react/prop-types
function LineInfoLayout({startPoint , endPoint}) {
  return (
    <>
    <div className="position">
        <div className="label my-2 bold-roboto">Starting Point</div>
        <PointInput value={startPoint}/>
        <div className="label my-2 bold-roboto">Ending Point</div>
        <PointInput value={endPoint}/>
      </div>
    
    
    
    </>
  )
}

export default LineInfoLayout