// import React from 'react'
import { GrUpdate } from "react-icons/gr";
import PointInput from "../HelperComponents/PointInput";
import PositionInput from "../HelperComponents/PositionInput";
import SecondaryOutlinedButton from "../HelperComponents/SecondaryOutlinedButton";
import { handleCircleChangeFunctionality } from "../../Utils/func";
import { useEffect, useState } from "react";
import shapeStore from "../../Stores/ShapeStore";

// eslint-disable-next-line react/prop-types
function CircleInfoLayout({ centerPoint, radius }) {

  const [centerPointState, setCenterPointState] = useState(centerPoint);
  const [radiusState, setRadiusState] = useState(radius);

  useEffect(() => {
    setCenterPointState(centerPoint);
    setRadiusState(radius);
  }, [shapeStore.selectedShape]);

  const onCenterPointChange = (centerPoint) => {
    setCenterPointState(centerPoint);
    console.log(centerPoint);
  };

  const onRadiusChange = (radius) => {
    setRadiusState(radius);
    // console.log(radius);
  };


  return (
    <>
      <div className="position">
        <div className="label my-2 bold-roboto">Center</div>
        <PointInput value={centerPointState} onChange={onCenterPointChange} />
        <div className="label my-2 bold-roboto">Radius</div>
        <PositionInput label={"R"} value={radiusState}  onChange={onRadiusChange}/>
      </div>
      <div className="button-cover" onClick={() => handleCircleChangeFunctionality(centerPointState, radiusState)}>
        <SecondaryOutlinedButton text={"Update"} icon={<GrUpdate />}  />
      </div>
    </>
  );
}

export default CircleInfoLayout;
