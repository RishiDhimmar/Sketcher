/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useState } from "react";
import PointInput from "../HelperComponents/PointInput";
import shapeStore from "../../Stores/ShapeStore";
import SecondaryOutlinedButton from "../HelperComponents/SecondaryOutlinedButton";
import { GrUpdate } from "react-icons/gr";
import { handlePolyLineChangeFunctionality } from "../../Utils/func";

function PolylineInfoLayout({ points }) {
  const [pointsState, setPointsState] = useState(points);

  useEffect(() => {
    setPointsState(points);
    console.log("points",points)

  }, [shapeStore.selectedShape]);


  const handlePointsChange = (newPoint, index) => {
    const tempPoints = [...pointsState];
    tempPoints[index] = newPoint;
    setPointsState(tempPoints)
  }
  return (
    <>
      <div className="position">
        {pointsState?.map((point, index) => {
          return (
            <>
              {index < points.length - 1 && (
                <>
                  {" "}
                  <div className="label my-2 bold-roboto">Point {index}</div>
                  <PointInput value={point} points={points} setPoints={setPointsState} index={index} key={index} onChange={(newPoint) => handlePointsChange(newPoint, index)} />
                </>
              )}
            </>
          );
        })}
      </div>
      <div className="button-cover" onClick={() => handlePolyLineChangeFunctionality(pointsState)}>
        <SecondaryOutlinedButton text={"Update"} icon={<GrUpdate />}  />
      </div>
    </>
  );
}

export default PolylineInfoLayout;
