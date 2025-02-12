import PointInput from '../HelperComponents/PointInput'
import PositionInput from '../HelperComponents/PositionInput'

// eslint-disable-next-line react/prop-types
function EllipseInfoLayout({centerPoint, radiusX, radiusY}) {
  return (
    <>
    <div className="position">
        <div className="label my-2 bold-roboto">Center</div>
        <PointInput value={centerPoint}/>
        <div className="label my-2 bold-roboto">Radius</div>
        <PositionInput label={"R"} sub={"x"} value={radiusX}/>
        <PositionInput label={"R"} sub={"y"} value={radiusY}/>
      </div>
    </>
  )
}

export default EllipseInfoLayout