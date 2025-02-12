import { IoTrashOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import shapeStore from "../../Stores/ShapeStore";
import { observer } from "mobx-react";
import { useState } from "react";

const TreeEntry = observer(({ icon, name, shapeId }) => {
  const [isVisible , setIsVisible] = useState(true)
  const handleSelectedShape = () => {
    shapeStore.setSelectedShape(shapeId);
  };
  const handleVisible = () => {
    setIsVisible(!isVisible);
    shapeStore.shapeMap.get(shapeId).mesh.visible = !isVisible
  }

  return (
    <div
      className={`tree-element flex justify-between  p-2 pr-3 rounded cursor-pointer ${shapeStore.selectedShape === shapeId ? "bg-blue-400 text-white" : "bg-transparent hover:bg-white"}`}
      onClick={handleSelectedShape}
    >
      {/* {console.log(shapeStore.selectedShape === shapeId)} */}
      <div className="file wrap1 flex">
        <div className="arrow my-1 mr-2 cursor-pointer">{icon}</div>
        <div className="font-roboto normal-roboto tracking-wide">{name}</div>
      </div>
      <div className="wrap2 flex gap-3">
        <div className="eye-icon text-lg my-1 cursor-pointer" onClick={handleVisible}>
          <LuEye />
        </div>
        <div className="bin-icon my-1 cursor-pointer">
          <IoTrashOutline />
        </div>
      </div>
    </div>
  );
});

export default TreeEntry;
