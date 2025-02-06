import { TbLine } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { IoEllipseOutline } from "react-icons/io5";
import { MdOutlinePolyline } from "react-icons/md";
import ShapeSelector from "./ShapeSelector";
import { FaRegSave } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";

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
      <div className="w-100 bg-[#f4f4f4] p-3 flex rounded-lg  justify-between">
        {shapes.map((shape) => (
          <ShapeSelector key={shape.lable} icon={shape.icon} lable={shape.lable} />
        ))}
        <div className="gap"></div>
        {functionalities.map((func) => (
          <ShapeSelector key={func.lable} icon={func.icon} lable={func.lable} />
        ))}
      </div>
    </div>
  );
}

export default Center;
