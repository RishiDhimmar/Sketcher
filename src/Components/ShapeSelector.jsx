import React from "react";

const ShapeSelector = ({ icon, lable }) => {
  return (
    <div className="shape-wrap flex flex-col justify-center items-center hover:bg-white p-2 rounded-lg cursor-pointer ">
      <div className="icon-con mb-2">{icon}</div>
      <div className="font-poppins">{lable}</div>
    </div>
  );
}

export default ShapeSelector;
