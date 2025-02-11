import { TbLine } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { IoEllipseOutline } from "react-icons/io5";
import { MdOutlinePolyline } from "react-icons/md";
import ShapeSelector from "../HelperComponents/ShapeSelector";
import { FaRegSave } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";
import * as THREE from 'three'


function Center() {
  const shapes = [
    { lable: "Line", icon: <TbLine /> },
    { lable: "Circle", icon: <FaRegCircle /> },
    { lable: "Ellipse", icon: <IoEllipseOutline /> },
    { lable: "Polyline", icon: <MdOutlinePolyline /> },
  ];

  const functionalities = [
    {
      lable: "Save",
      icon: <FaRegSave />,
    },
    {
      lable: "Upload",
      icon: <BsUpload />,
    }
  ]



  return (
    <div className="container w-100 absolute top-0 left-90">
      <div className="w-100 p-3 flex rounded-lg  justify-between">
        <div className="wrap classic-background flex justify-between items-center p-2 rounded-lg min-w-[330px] py-[6px] px-[12px] " >
        {shapes.map((shape) => (
          <ShapeSelector key={shape.lable} icon={shape.icon} lable={shape.lable} />
        ))}

        </div>
        <div className="gap mx-3"></div>
        {functionalities.map((func) => (
        <div key={func.lable} className="wrap classic-background flex justify-center items-center rounded-lg py-[6px] px-[12px] mx-1" >

          <ShapeSelector key={func.lable} icon={func.icon} lable={func.lable} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Center;
