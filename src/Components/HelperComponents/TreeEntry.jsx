import { IoTrashOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import shapeStore from "../../Stores/ShapeStore";
import { observer } from "mobx-react";
import { useState } from "react";
import { updateShapeOpacity } from "../../Utils/func";

const TreeEntry = observer(({ icon, name, shapeId }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleSelectedShape = () => {
    shapeStore.setSelectedShape(shapeId);
  };

  const handleVisible = () => {
    setIsVisible(!isVisible);

    const selectedShape = shapeStore.shapeMap.get(shapeId);

    if (selectedShape) {
      selectedShape.mesh.visible = !isVisible;
      selectedShape.setOpacity(isVisible ? 0 : 100);
      updateShapeOpacity(isVisible ? 0 : 100);
      shapeStore.setUpdateFlag(!shapeStore.updateFlag);
    }
  };

  const handleDelete = () => {
    shapeStore.setSelectedShape(shapeId);
    shapeStore.setDeleteFlag(true);
  };

  return (
    <div
      className={`tree-element flex justify-between p-2 pr-3 rounded cursor-pointer ${
        shapeStore.selectedShape === shapeId
          ? "bg-blue-400 text-white"
          : "bg-transparent hover:bg-white"
      }`}
      onClick={handleSelectedShape}
    >
      <div className="file wrap1 flex">
        <div className="arrow my-1 mr-2 cursor-pointer">{icon}</div>
        <div className="font-roboto normal-roboto tracking-wide">{name}</div>
      </div>
      <div className="wrap2 flex gap-3">
        <div
          className="eye-icon text-lg my-1 cursor-pointer"
          onClick={handleVisible}
        >
          {isVisible ? <LuEye /> : <LuEyeOff />}
        </div>
        <div className="bin-icon my-1 cursor-pointer" onClick={handleDelete}>
          <IoTrashOutline />
        </div>
      </div>
    </div>
  );
});

export default TreeEntry;
