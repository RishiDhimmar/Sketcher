import React from "react";
import PositionInput from "./PositionInput";

function PointInput() {
  return (
    <>
      <PositionInput label={"X"} />
      <PositionInput label={"Y"} />
      <PositionInput label={"Z"} />
    </>
  );
}

export default PointInput;
