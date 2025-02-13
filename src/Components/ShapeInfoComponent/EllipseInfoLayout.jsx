import { GrUpdate } from "react-icons/gr";
import PointInput from "../HelperComponents/PointInput";
import PositionInput from "../HelperComponents/PositionInput";
import SecondaryOutlinedButton from "../HelperComponents/SecondaryOutlinedButton";
import { handleEllipseChangeFunctionality } from "../../Utils/func";
import { useEffect, useState } from "react";
import shapeStore from "../../Stores/ShapeStore";

// eslint-disable-next-line react/prop-types
function EllipseInfoLayout({ centerPoint, radiusX, radiusY }) {
  const [centerPointState, setCenterPointState] = useState(centerPoint);
  const [radiusXState, setRadiusXState] = useState(radiusX);
  const [radiusYState, setRadiusYState] = useState(radiusY);

  useEffect(() => {
    setCenterPointState(centerPoint);
    setRadiusXState(radiusX);
    setRadiusYState(radiusY);
  }, [centerPoint, radiusX, radiusY, shapeStore.selectedShape]);
  
  const onChangeCenterPoint = (centerPoint) => {
    setCenterPointState(centerPoint);
    console.log(centerPoint);
  }

  const onChangeRadiusX = (radiusX) => {
    setRadiusXState(radiusX);
    console.log(radiusX);
  }

  const onChangeRadiusY = (radiusY) => {
    setRadiusYState(radiusY);
    console.log(radiusY);
  }
  return (
    <>
      <div className="position">
        <div className="label my-2 bold-roboto">Center</div>
        <PointInput value={centerPointState} onChange={onChangeCenterPoint} />
        <div className="label my-2 bold-roboto">Radius</div>
        <PositionInput label={"R"} sub={"x"} value={radiusXState} onChange={onChangeRadiusX} />
        <PositionInput label={"R"} sub={"y"} value={radiusYState} onChange={onChangeRadiusY} />
      </div>
      <div
        className="button-cover"
        onClick={() =>
          handleEllipseChangeFunctionality(centerPointState, radiusXState, radiusYState)
        }
      >
        <SecondaryOutlinedButton text={"Update"} icon={<GrUpdate />} />
      </div>
    </>
  );
}

export default EllipseInfoLayout;
