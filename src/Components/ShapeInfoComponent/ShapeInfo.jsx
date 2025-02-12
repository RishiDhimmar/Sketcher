import SecondaryOutlinedButton from "../HelperComponents/SecondaryOutlinedButton";
import { GrUpdate } from "react-icons/gr";
import { LuEye } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import { observer } from "mobx-react";
import shapeStore from "../../Stores/ShapeStore";
import LineInfoLayout from "./LineInfoLayout";
import CircleInfoLayout from "./CircleInfoLayout";
import EllipseInfoLayout from "./EllipseInfoLayout";
import PolylineInfoLayout from "./PolylineInfoLayout";

const ShapeInfo = observer(() => {

  const selectedShape = shapeStore?.shapeMap?.get(shapeStore.selectedShape)
  console.log(selectedShape)
  
  return (
    <div className="container-fluid max-h-[90vh] overflow-auto pr-3">

      {/* Properties Section */}
      <div className="font-robot">
        <div className="bold-roboto mb-4">Properties</div>
      </div>

      <div className="font-roboto">{selectedShape?.name}</div>
      <div className="line my-4 border-t border-gray-300"></div>
      
      {selectedShape?.type == 'line' ? <LineInfoLayout /> : null}
      {selectedShape?.type == 'circle' ? <CircleInfoLayout /> : null}
      {selectedShape?.type == 'ellipse' ? <EllipseInfoLayout /> : null}
      {selectedShape?.type == 'polyLine' ? <PolylineInfoLayout /> : null}


      <div className="button-cover">
        <SecondaryOutlinedButton text={"Update"} icon={<GrUpdate />} />
      </div>

      {/* Color Section */}
      <div className="label my-2 font-roboto bold-roboto">Color</div>
      <div className="wrap flex gap-3 justify-between">
        <input type="color" name="color" id="color" />
        <div className="font-roboto">Color Value</div>
        <input
          type="number"
          min="1"
          max="100"
          id="myPercent"
          className="font-poppins bg-white text-center rounded"
          placeholder="100"
        />
      </div>

      <div className="btn-line my-3"></div>
      <SecondaryOutlinedButton text={"Hide"} icon={<LuEye />} />
      <SecondaryOutlinedButton text={"Delete"} icon={<IoTrashOutline />} />
    </div>
  );
})

export default ShapeInfo;
