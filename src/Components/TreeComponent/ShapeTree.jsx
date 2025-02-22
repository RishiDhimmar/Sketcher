import { observer } from "mobx-react-lite"; // Import observer
import { IoEllipseOutline, IoSearch } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { TbLine } from "react-icons/tb";
import "../../index.css";
import TreeEntry from "../HelperComponents/TreeEntry";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlinePolyline } from "react-icons/md";
import shapeStore from "../../Stores/ShapeStore";
import { useEffect, useState } from "react";
import { handleVisibilityChangeFunctionality } from "../../Utils/func";
import { TbOvalVertical } from "react-icons/tb";
import { set } from "mobx";

const ShapeTree = observer(() => {
  const [fileVisibility, setFileVisibility] = useState(true);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [filteredShapes, setFilteredShapes] = useState("");  
  
  const shapes = {
    line: <TbLine />,
    circle: <FaRegCircle />,
    ellipse: <TbOvalVertical />,
    polyLine: <MdOutlinePolyline />,
  };

  const handleFileVisibility = () => {
    setFileVisibility(!fileVisibility);
    shapeStore.shapeMap.keys().forEach((key) => {
      handleVisibilityChangeFunctionality(
        shapeStore.shapeMap.get(key),
        !fileVisibility
      );
    });
  };

  const handleDelete = () => {
    shapeStore.shapeMap.keys().forEach((key) => {
      shapeStore.setSelectedShape(key);
      shapeStore.deleteFlag = true;
    });
  };

  const handleSearchVisibility = () => {
    setSearchVisibility(!searchVisibility);
  }

  const handleContentVisibility = () => {
    setShowContent(!showContent);
    if (showContent) {
      document.getElementsByClassName("shapes")[0].style.display = "none";
    } else {
      document.getElementsByClassName("shapes")[0].style.display = "block";
    }
  };

  const handleSearch = (e) => {
    setFilteredShapes(e.target.value);  
  };

  const shapeData = shapeStore?.getShapeMap;

  // Filter shapes based on search term
  const filteredShapeData = Array.from(shapeData?.entries()).filter(([key, shape]) => {
    return shape?.name.toLowerCase().includes(filteredShapes.toLowerCase());
  });

  return (
    <div className="container-fluid max-h-[95vh] ">
      <div className="label-wrap flex justify-between">
        <div className="label text-md normal-roboto font-roboto">
          List Of Created Object
        </div>
        <i className="mt-1 cursor-pointer" onClick={handleSearchVisibility} >
          <IoSearch />
        </i>
      </div>
       {searchVisibility && <div className="wrap ">
        <input
          type="text"
          name="shape"
          id="shape"
          value={filteredShapes}
          onChange={handleSearch} 
          className="w-full py-2 my-2 bg-white outline-0 px-3"
        />
      </div> }
      <div className="line mt-5 border-t border-gray-400"></div>
      <div className="file overflow-y-auto">
        <div className="tree-element flex justify-between hover:bg-white py-2 rounded">
          <div className="file wrap1 flex ">
            <div
              className="icon-con arrow my-1 mr-2 cursor-pointer"
              onClick={handleContentVisibility}
            >
              {showContent ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
            </div>
            <div className="font-roboto normal-roboto">My File 1</div>
          </div>
          <div className="wrap2 flex gap-3">
            <div
              className="icon-con eye-icon text-lg my-1 cursor-pointer"
              onClick={handleFileVisibility}
            >
              {fileVisibility ? <LuEye /> : <LuEyeOff />}
            </div>
            <div
              className="icon-con bin-icon my-1 cursor-pointer"
              onClick={handleDelete}
            >
              <IoTrashOutline />
            </div>
          </div>
        </div>
        <div className="shapes pl-5 max-h-[80vh] overflow-y-auto duration-300">
          {filteredShapeData.length > 0 ? (
            filteredShapeData.map(([key, shape]) => {
              return (
                <TreeEntry
                  key={key}
                  icon={shapes[shape?.type]}
                  name={shape?.name}
                  shapeId={key}
                />
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ShapeTree;
