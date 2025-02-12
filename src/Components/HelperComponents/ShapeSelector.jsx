// import React, { useEffect } from "react";

const ShapeSelector = ({ icon, label, onClick }) => {

  return (
    <div
      className="shape-wrap flex flex-col justify-center items-center hover:bg-white p-2 rounded-lg cursor-pointer "
      onClick={onClick}
    >
      <div className="icon-con mb-2 w-[16px] h-[16px]">{icon}</div>
      <div className=" font-poppins bold-poppins text-[14px]">{label}</div>
    </div>
  );
};

export default ShapeSelector;
