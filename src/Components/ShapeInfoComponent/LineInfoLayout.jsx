// import React from 'react'
import { useEffect, useState } from 'react'
import PointInput from '../HelperComponents/PointInput'
import { handleLineChangeFunctionality } from '../../Utils/func'
import SecondaryOutlinedButton from '../HelperComponents/SecondaryOutlinedButton'
import { GrUpdate } from 'react-icons/gr'
import shapeStore from '../../Stores/ShapeStore'

// eslint-disable-next-line react/prop-types
function LineInfoLayout({startPoint , endPoint}) {

  const [startPointState, setStartPointState] = useState(startPoint)
  const [endPointState, setEndPointState] = useState(endPoint)

  useEffect(() => {
    setStartPointState(startPoint)
    setEndPointState(endPoint)
  },[shapeStore.selectedShape])
  const onStartStateChange = (startPoint) => {
    setStartPointState(startPoint)
    console.log(startPoint)
  }

  const onEndStateChange = (endPoint) => {
    setEndPointState(endPoint)
    console.log( endPoint)
  }
  return (
    <>
    <div className="position ">
        <div className="label my-2 bold-roboto">Starting Point</div>
        <PointInput value={startPointState} onChange={onStartStateChange} />
        <div className="label my-2 bold-roboto">Ending Point</div>
        <PointInput value={endPointState} onChange={onEndStateChange} />
      </div>
      <div className="button-cover" onClick={() => handleLineChangeFunctionality(startPointState, endPointState)}>
        <SecondaryOutlinedButton text={"Update"} icon={<GrUpdate />}  />
      </div>
    </>
  )
}

export default LineInfoLayout