// eslint-disable-next-line no-unused-vars
import React from "react";
import { IoEllipseOutline, IoSearch } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { TbLine } from "react-icons/tb";

import "../index.css";
import TreeEntry from "./TreeEntry";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlinePolyline } from "react-icons/md";

function ShapeTree() {
  const shapes = [
    { name: "Line", icon: <TbLine /> },
    { name: "Circle", icon: <FaRegCircle /> },
    { name: "Ellipse", icon: <IoEllipseOutline /> },
    { name: "Polyline", icon: <MdOutlinePolyline /> },
  ];
  return (
    <div className="container-fluid ">
      <div className="label-wrap flex justify-between">
        <div className="label opacity-70 text-md font-poppins ">
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
            <div className="font-poppins">My File 1</div>
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
          {shapes.map((shape) => {
            return <TreeEntry key={shape.name} icon={shape.icon} name={shape.name} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ShapeTree;
