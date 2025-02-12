// import React from 'react'
import PointInput from '../HelperComponents/PointInput'
import PositionInput from '../HelperComponents/PositionInput'

function CircleInfoLayout() {
  return (
    <>
     <div className="position">
        <div className="label my-2 bold-roboto">Center</div>
        <PointInput />
        <div className="label my-2 bold-roboto">Radius</div>
        <PositionInput label={"R"} />
      </div>
    </>
  )
}

export default CircleInfoLayout