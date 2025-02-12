import { observer } from "mobx-react-lite"; // Import observer
import { IoEllipseOutline, IoSearch } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { TbLine } from "react-icons/tb";
import "../../index.css";
import TreeEntry from "../HelperComponents/TreeEntry";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlinePolyline } from "react-icons/md";
import shapeStore from "../../Stores/ShapeStore";

const ShapeTree = observer(() => {
  const shapes = {
    "line": <TbLine />,
    "circle": <FaRegCircle />,
    "ellipse": <IoEllipseOutline />,
    "polyLine": <MdOutlinePolyline />,
  };

  const shapeData = shapeStore?.getShapeMap; 

  return (
    <div className="container-fluid ">
      <div className="label-wrap flex justify-between">
        <div className="label text-md normal-roboto font-roboto">
          List Of Created Object
        </div>
        <i className="mt-1">
          <IoSearch />
        </i>
      </div>
      <div className="line mt-5 border-t border-gray-400"></div>
      <div className="file">
        <div className="tree-element flex justify-between hover:bg-white py-2 rounded">
          <div className="file wrap1 flex ">
            <div className="arrow my-1 mr-2 cursor-pointer">
              <IoMdArrowDropright />
            </div>
            <div className="font-roboto normal-roboto">My File 1</div>
          </div>
          <div className="wrap2 flex gap-3">
            <div className="eye-icon text-lg my-1 cursor-pointer">
              <LuEye />
            </div>
            <div className="bin-icon my-1 cursor-pointer">
              <IoTrashOutline />
            </div>
          </div>
        </div>
        <div className="shapes pl-5">
          {Array.from(shapeData?.entries()).map(([key, shape]) => {
            return (
              <TreeEntry
                key={key}
                icon={shapes[shape?.type]}
                name={shape?.name}
                shapeId={key}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default ShapeTree;
