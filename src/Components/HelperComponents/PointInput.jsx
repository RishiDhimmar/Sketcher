/* eslint-disable react/prop-types */
import PositionInput from "./PositionInput";

// eslint-disable-next-line react/prop-types
function PointInput({value , onChange}) {


  const handlePointChange = (axis, newValue) => {
    const newPoint = {...value};
    newPoint[axis] = newValue;
    // console.log(index)
    onChange(newPoint);
  }
  
  return (
    <>
      <PositionInput label={"X"} value={value?.x} onChange={(newValue) => handlePointChange("x", newValue)}/>
      <PositionInput label={"Y"} value={value?.y} onChange={(newValue) => handlePointChange("y", newValue)}/>
      <PositionInput label={"Z"} value={value?.z} onChange={(newValue) => handlePointChange("z", newValue)}/>
    </>
  );
}

export default PointInput;
