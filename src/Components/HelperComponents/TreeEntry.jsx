import { IoTrashOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";

const TreeEntry = ({ icon, name }) => {
  return (
    <div className="tree-element flex justify-between hover:bg-white p-2 pr-0 rounded cursor-pointer">
      <div className="file wrap1 flex ">
        <div className="arrow my-1 mr-2 cursor-pointer">{icon}</div>
        <div className="font-roboto normal-roboto">{name}</div>
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
  );
}

export default TreeEntry;
