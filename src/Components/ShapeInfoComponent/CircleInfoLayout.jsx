// import React from 'react'
import PointInput from '../HelperComponents/PointInput'
import PositionInput from '../HelperComponents/PositionInput'

// eslint-disable-next-line react/prop-types
function CircleInfoLayout({centerPoint, radius}) {
  return (
    <>
     <div className="position">
        <div className="label my-2 bold-roboto">Center</div>
        <PointInput value={centerPoint}/>
        <div className="label my-2 bold-roboto">Radius</div>
        <PositionInput label={"R"} value={radius} />
      </div>
    </>
  )
}

export default CircleInfoLayout