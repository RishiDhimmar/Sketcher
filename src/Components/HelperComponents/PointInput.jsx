/* eslint-disable react/prop-types */
import PositionInput from "./PositionInput";

// eslint-disable-next-line react/prop-types
function PointInput({value}) {
  return (
    <>
      <PositionInput label={"X"} value={value?.x}/>
      <PositionInput label={"Y"} value={value?.y}/>
      <PositionInput label={"Z"} value={value?.z}/>
    </>
  );
}

export default PointInput;
