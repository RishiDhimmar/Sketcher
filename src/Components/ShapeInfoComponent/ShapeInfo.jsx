import SecondaryOutlinedButton from "../HelperComponents/SecondaryOutlinedButton";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import { observer } from "mobx-react";
import shapeStore from "../../Stores/ShapeStore";
import LineInfoLayout from "./LineInfoLayout";
import CircleInfoLayout from "./CircleInfoLayout";
import EllipseInfoLayout from "./EllipseInfoLayout";
import PolylineInfoLayout from "./PolylineInfoLayout";
import { useEffect, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {
  handleVisibilityChangeFunctionality,
  updateShapeOpacity,
} from "../../Utils/func";
import { SHAPES_INFO } from "../../Utils/Classes/Shape/ShapeInfo";

const ShapeInfo = observer(() => {
  const [shapeColor, setShapeColor] = useState("#ff0000");
  const [shapeOpacity, setShapeOpacity] = useState(null);
  const [visible, setVisible] = useState(true);

  const selectedShape = shapeStore?.shapeMap?.get(shapeStore.selectedShape);

  useEffect(() => {
    if (selectedShape) {
      setShapeColor(selectedShape.color);
      setShapeOpacity(selectedShape.opacity);
    }
    console.log("selectedShape", selectedShape);
  }, [selectedShape]);
  function hexToRgb(hex) {
    // Remove the "#" if it exists
    hex = hex.replace("#", "");
  
    // Convert to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
  
    return `rgb(${r}, ${g}, ${b})`;
  }
  

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setShapeColor(newColor);

    if (selectedShape && selectedShape.mesh) {
      selectedShape.mesh.material.color.set(newColor);
      selectedShape.mesh.material.needsUpdate = true;
    }

    if (selectedShape) {
      shapeStore.updateShapeColor(selectedShape._id, newColor);
    }
  };

  const handleOpacityChange = (event) => {
    let newOpacity = parseFloat(event.target.value) / 100;
    setShapeOpacity(newOpacity * 100);

    if (selectedShape) {
      selectedShape.setOpacity(newOpacity);
      updateShapeOpacity(newOpacity);
    }

    shapeStore.setUpdateFlag(!shapeStore.updateFlag);
  };

  const handleVisibilityChange = () => {
    const newVisibility = !visible;
    setVisible(newVisibility);
    handleVisibilityChangeFunctionality(selectedShape, newVisibility);
  };

  const handleDelete = () => {
    shapeStore.setDeleteFlag(true);
  };

  return (
    <div className="container-fluid max-h-[93vh] w-full flex justify-center overflow-auto duration-300 py-3 ">
      {selectedShape ? (
        <>
        <div className="wrap w-full p-4 " >

          <div className="font-robot">
            <div className="bold-roboto mb-4">Properties</div>
          </div>

          <div className="font-roboto">{selectedShape?.name}</div>
          <div className="line my-4 border-t border-gray-300"></div>
          <div className="con duration-300">
            {/* Shape-specific Info */}
            {selectedShape?.type === SHAPES_INFO.LINE && (
              <LineInfoLayout
                startPoint={selectedShape?.mp1}
                endPoint={selectedShape?.mp2}
              />
            )}
            {selectedShape?.type === SHAPES_INFO.CIRCLE && (
              <CircleInfoLayout
                centerPoint={selectedShape?.centerpoint}
                radius={selectedShape?.radius}
              />
            )}
            {selectedShape?.type === SHAPES_INFO.ELLIPSE && (
              <EllipseInfoLayout
                centerPoint={selectedShape?.centerPoint}
                radiusX={selectedShape?.radiusX}
                radiusY={selectedShape?.radiusY}
              />
            )}
            {selectedShape?.type === SHAPES_INFO.POLYLINE && (
              <PolylineInfoLayout points={selectedShape.points} />
            )}
          </div>

          {/* Color Section */}
          <div className="label my-2 font-roboto bold-roboto">Color</div>
          <div className="wrap flex gap-3 justify-between">
            <input
              type="color"
              name="color"
              id="color"
              onChange={handleColorChange}
              value={shapeColor}
            />
            <div className="font-roboto">{hexToRgb(shapeColor)}</div>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              id="opacity"
              className="font-poppins bg-white text-center rounded"
              value={shapeOpacity}
              onChange={handleOpacityChange}
            />
            %
          </div>

          <div className="btn-line my-3"></div>

          <div className="temp" onClick={handleVisibilityChange}>
            <SecondaryOutlinedButton
              text={"Hide"}
              icon={visible ? <LuEye /> : <LuEyeOff />}
            />
          </div>
          <div className="" onClick={handleDelete}>
            <SecondaryOutlinedButton
              text={"Delete"}
              icon={<IoTrashOutline />}
            />
          </div>
        </div>

        </>
      ) : (
        <>
          <div className=" h-[100px] w-[330px] flex justify-center items-center font-roboto normal-roboto mx-4 fs-[18px] ">
            <div className="temp h-full w-full flex items-center justify-center border border-dotted rounded-md">
              <div className="cover text-center flex flex-col justify-center align-center">
                <div className="icon mx-auto my-2 fs-[18px]">
                <IoMdInformationCircleOutline />

                </div>
                <div className="info">Select Your Shape</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default ShapeInfo;
