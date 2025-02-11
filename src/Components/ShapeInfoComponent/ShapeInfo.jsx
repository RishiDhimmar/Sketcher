import PositionInput from "../HelperComponents/PositionInput";
import SecondaryOutlinedButton from "../HelperComponents/SecondaryOutlinedButton";
import { GrUpdate } from "react-icons/gr";
import { LuEye } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";


function ShapeInfo() {
  return (
    <div className="container-fluid max-h-[90vh] overflow-auto pr-3">
      {/* Empty Section */}
      {/* <div className="inner-con border border-dotted border-gray-500 h-full rounded-md"></div> */}

      {/* Properties Section */}
      <div className="font-robot">
        <div className="bold-roboto mb-4">Properties</div>
        <div className="font-roboto">Ellipse 1</div>
      </div>
      <div className="line my-4 border-t border-gray-300"></div>
      <div className="position">
        <div className="label my-2 bold-roboto">Center</div>
        <PositionInput label={"X"} />
        <PositionInput label={"Y"} />
        <PositionInput label={"Z"} />
      </div>
      <div className="radius">
        <div className="label my-2 bold-roboto">Radius</div>
        <PositionInput label={"R"} sub={"x"} />
        <PositionInput label={"R"} sub={"y"} />
      </div>

      <div className="button-cover">
        <SecondaryOutlinedButton text={"Update"} icon={<GrUpdate />} />
      </div>

      {/* Color Section */}
      <div className="label my-2 font-roboto bold-roboto">Color</div>
      <div className="wrap flex gap-3 justify-between">
        <input type="color" name="color" id="color" />
          <div className="font-roboto">Color Value</div>
        <input type="number" min="1" max="100" id="myPercent" className="font-poppins bg-white text-center rounded" placeholder="100"/>
      </div>

      <div className="btn-line my-3"></div>
      <SecondaryOutlinedButton text={"Hide"} icon={<LuEye />} />
      <SecondaryOutlinedButton text={"Delete"} icon={< IoTrashOutline />} />
    </div>
  );
}

export default ShapeInfo;
