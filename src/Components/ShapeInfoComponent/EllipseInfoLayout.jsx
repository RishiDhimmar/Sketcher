import PointInput from '../HelperComponents/PointInput'
import PositionInput from '../HelperComponents/PositionInput'

function EllipseInfoLayout() {
  return (
    <>
    <div className="position">
        <div className="label my-2 bold-roboto">Center</div>
        <PointInput />
        <div className="label my-2 bold-roboto">Radius</div>
        <PositionInput label={"R"} sub={"x"} />
        <PositionInput label={"R"} sub={"y"} />
      </div>
    </>
  )
}

export default EllipseInfoLayout