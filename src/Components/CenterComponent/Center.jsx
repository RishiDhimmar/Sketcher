import { TbLine } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { IoEllipseOutline } from "react-icons/io5";
import { MdOutlinePolyline } from "react-icons/md";
import ShapeSelector from "../HelperComponents/ShapeSelector";
import { FaRegSave } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";
import { SHAPES_INFO } from "../../Utils/Classes/Shape/ShapeInfo";
import { observer } from "mobx-react";
import shapeStore from "../../Stores/ShapeStore";


const Center = observer(() => {


  const shapes = [
    { label: "Line", icon: <TbLine /> , link : SHAPES_INFO.LINE},
    { label: "Circle", icon: <FaRegCircle /> , link : SHAPES_INFO.CIRCLE},
    { label: "Ellipse", icon: <IoEllipseOutline /> , link : SHAPES_INFO.ELLIPSE},
    { label: "Polyline", icon: <MdOutlinePolyline /> , link : SHAPES_INFO.POLYLINE},
  ];

  const functionalities = [
    {
      label: "Save",
      icon: <FaRegSave />,
    },
    {
      label: "Upload",
      icon: <BsUpload />,
    }
  ]

  const handleShapeClick = (shape) => {
    console.log(shape)
    shapeStore.setShape(shape)

  }




  return (
    <div className="container w-100 absolute top-0 left-90">
      <div className="w-100 p-3 flex rounded-lg  justify-between">
        <div className="wrap classic-background flex justify-between items-center p-2 rounded-lg min-w-[330px] py-[6px] px-[12px] " >
        {shapes.map((shape) => (
          <ShapeSelector key={shape.label} icon={shape.icon} label={shape.label} onClick={() => handleShapeClick(shape.link)}/>
        ))}

        </div>
        <div className="gap mx-3"></div>
        {functionalities.map((func) => (
        <div key={func.label} className="wrap classic-background flex justify-center items-center rounded-lg py-[6px] px-[12px] mx-1" >

          <ShapeSelector key={func.label} icon={func.icon} label={func.label} />
          </div>
        ))}
      </div>
    </div>
  );
})

export default Center;
