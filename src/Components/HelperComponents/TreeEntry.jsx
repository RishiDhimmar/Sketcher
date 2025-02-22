import { IoTrashOutline } from "react-icons/io5";
import { LuEye, LuEyeOff } from "react-icons/lu";
import shapeStore from "../../Stores/ShapeStore";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { handleVisibilityChangeFunctionality } from "../../Utils/func";

const TreeEntry = observer(({ icon, name, shapeId }) => {
  const [visible, setVisible] = useState(true);

  const selectedShape = shapeStore.shapeMap.get(shapeId);

  useEffect(() => {
    if (selectedShape) {
      setVisible(selectedShape?.mesh?.visible);
    }
  }, [shapeStore.updateFlag, selectedShape?.mesh?.visible]);

  const handleSelectedShape = () => {
    if (shapeStore.selectedShape === shapeId) {
      shapeStore.setSelectedShape(null);
    } else {
      shapeStore.setSelectedShape(shapeId);
      console.log("shapeId", shapeId);
    }
    shapeStore.setUpdateFlag(!shapeStore.updateFlag);
  };

  const handleVisibilityChange = (event) => {
    event.stopPropagation();
    const newVisibility = !visible;
    setVisible(newVisibility);
    const selectedShape = shapeStore.shapeMap.get(shapeId);
    handleVisibilityChangeFunctionality(selectedShape, newVisibility);
  };

  const handleDelete = () => {
    shapeStore.setSelectedShape(shapeId);
    shapeStore.setDeleteFlag(true);
  };

  return (
    <div
      className={`tree-element flex justify-between p-2 pr-3 rounded cursor-pointer duration-0 ${
        shapeStore.selectedShape === shapeId
          ? "bg-blue-400 text-white"
          : "bg-transparent hover:bg-white"
      }`}
      onClick={handleSelectedShape}
    >
      <div className="file wrap1 flex">
        <div className="arrow my-1 mr-2 cursor-pointer transition-color duration-0">{icon}</div>
        <div className="font-roboto normal-roboto tracking-wide duration-1000">{name}</div>
      </div>
      <div className="wrap2 flex gap-3">
        <div
          className="eye-icon text-lg my-1 cursor-pointer duration-0"
          onClick={handleVisibilityChange}
        >
          {visible ? <LuEye /> : <LuEyeOff />}
        </div>
        <div className="bin-icon my-1 cursor-pointer transition-colors duration-0" onClick={handleDelete}>
          <IoTrashOutline />
        </div>
      </div>
    </div>
  );
});

export default TreeEntry;
