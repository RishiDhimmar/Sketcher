
// import SecondaryOutlinedButton from "../HelperComponents/SecondaryOutlinedButton";
// import { GrUpdate } from "react-icons/gr";
// import { LuEye } from "react-icons/lu";
// import { IoTrashOutline } from "react-icons/io5";
// import { observer } from "mobx-react";
// import shapeStore from "../../Stores/ShapeStore";
// import LineInfoLayout from "./LineInfoLayout";
// import CircleInfoLayout from "./CircleInfoLayout";
// import EllipseInfoLayout from "./EllipseInfoLayout";
// import PolylineInfoLayout from "./PolylineInfoLayout";
// import { useEffect, useState } from "react";
// import { updateShapeOpacity } from "../../Utils/func";

// const ShapeInfo = observer(() => {
//   const [shapeColor, setShapeColor] = useState("#ff0000");
//   const [shapeOpacity, setShapeOpacity] = useState(1); // Default opacity set to 1 (fully opaque)

//   const selectedShape = shapeStore?.shapeMap?.get(shapeStore.selectedShape);

//   useEffect(() => {
//     if (selectedShape) {
//       console.log("Shape selected", selectedShape.opacity);
//       setShapeColor(selectedShape.color);
//       setShapeOpacity(selectedShape.opacity); // Initialize opacity from shape
//     }
//   }, [shapeStore.selectedShape, shapeStore.updateFlag]); // Trigger useEffect whenever the selected shape changes

//   // Handle color change
//   const handleColorChange = (event) => {
//     const newColor = event.target.value;
//     setShapeColor(newColor);

//     if (selectedShape && selectedShape.mesh) {
//       selectedShape.mesh.material.color.set(newColor);
//     }

//     if (selectedShape) {
//       shapeStore.updateShapeColor(selectedShape._id, newColor);
//     }
//   };

//   const handleOpacityChange = (event) => {
//     let newOpacity = parseFloat(event.target.value) ; 
//     setShapeOpacity(newOpacity);

//     updateShapeOpacity(newOpacity);

//     if (selectedShape) {
//       selectedShape.setOpacity(newOpacity);
//     }
//     shapeStore.setUpdateFlag(!shapeStore.updateFlag); 
//   };

//   return (
//     <div className="container-fluid max-h-[90vh] overflow-auto pr-3">
//       <div className="font-robot">
//         <div className="bold-roboto mb-4">Properties</div>
//       </div>

//       <div className="font-roboto">{selectedShape?.name}</div>
//       <div className="line my-4 border-t border-gray-300"></div>

//       {/* Shape-specific Info */}
//       {selectedShape?.type === 'line' && (
//         <LineInfoLayout startPoint={selectedShape?.mp1} endPoint={selectedShape?.mp2} />
//       )}
//       {selectedShape?.type === 'circle' && (
//         <CircleInfoLayout centerPoint={selectedShape?.centerpoint} radius={selectedShape?.radius} />
//       )}
//       {selectedShape?.type === 'ellipse' && (
//         <EllipseInfoLayout
//           centerPoint={selectedShape?.centerPoint}
//           radiusX={selectedShape?.radiusX}
//           radiusY={selectedShape?.radiusY}
//         />
//       )}
//       {selectedShape?.type === 'polyLine' && (
//         <PolylineInfoLayout points={selectedShape?.points} />
//       )}

//       <div className="button-cover">
//         <SecondaryOutlinedButton text={"Update"} icon={<GrUpdate />} />
//       </div>

//       {/* Color Section */}
//       <div className="label my-2 font-roboto bold-roboto">Color</div>
//       <div className="wrap flex gap-3 justify-between">
//         <input
//           type="color"
//           name="color"
//           id="color"
//           onChange={handleColorChange}
//           value={shapeColor}
//         />
//         <div className="font-roboto">{shapeColor}</div>
//         <input
//           type="number"
//           min="0"
//           max="100"
//           step="1"
//           id="opacity"
//           className="font-poppins bg-white text-center rounded"
//           value={shapeOpacity } // Convert to percentage for display
//           onChange={handleOpacityChange}
//         />
//       </div>

//       <div className="btn-line my-3"></div>
//       <SecondaryOutlinedButton text={"Hide"} icon={<LuEye />} />
//       <SecondaryOutlinedButton text={"Delete"} icon={<IoTrashOutline />} />
//     </div>
//   );
// });

// export default ShapeInfo;
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
import { useEffect, useState } from "react";

const ShapeInfo = observer(() => {
  const [shapeColor, setShapeColor] = useState("#ff0000");
  const [shapeOpacity, setShapeOpacity] = useState(1); // Default opacity set to 1 (fully opaque)

  const selectedShape = shapeStore?.shapeMap?.get(shapeStore.selectedShape);

  useEffect(() => {
    if (selectedShape) {
      console.log("Shape selected", selectedShape.opacity);
      setShapeColor(selectedShape.color);
      setShapeOpacity(selectedShape.opacity); // Initialize opacity from shape
    }
  }, [shapeStore.selectedShape, shapeStore.updateFlag]);

  // Handle color change
  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setShapeColor(newColor);

    if (selectedShape && selectedShape.mesh) {
      selectedShape.mesh.material.color.set(newColor);
      selectedShape.mesh.material.needsUpdate = true; // Force material update
    }

    if (selectedShape) {
      shapeStore.updateShapeColor(selectedShape._id, newColor);
    }
  };

  const handleOpacityChange = (event) => {
    let newOpacity = parseFloat(event.target.value) / 100; // Normalize to 0-1
    setShapeOpacity(newOpacity);

    if (selectedShape) {
      selectedShape.setOpacity(newOpacity);
      selectedShape.mesh.material.opacity = newOpacity;
      selectedShape.mesh.material.transparent = true; // Ensure transparency is enabled
      selectedShape.mesh.material.needsUpdate = true; // Force material update
    }

    shapeStore.setUpdateFlag(!shapeStore.updateFlag); // Trigger re-render
  };

  return (
    <div className="container-fluid max-h-[90vh] overflow-auto pr-3">
      <div className="font-robot">
        <div className="bold-roboto mb-4">Properties</div>
      </div>

      <div className="font-roboto">{selectedShape?.name}</div>
      <div className="line my-4 border-t border-gray-300"></div>

      {/* Shape-specific Info */}
      {selectedShape?.type === 'line' && (
        <LineInfoLayout startPoint={selectedShape?.mp1} endPoint={selectedShape?.mp2} />
      )}
      {selectedShape?.type === 'circle' && (
        <CircleInfoLayout centerPoint={selectedShape?.centerpoint} radius={selectedShape?.radius} />
      )}
      {selectedShape?.type === 'ellipse' && (
        <EllipseInfoLayout
          centerPoint={selectedShape?.centerPoint}
          radiusX={selectedShape?.radiusX}
          radiusY={selectedShape?.radiusY}
        />
      )}
      {selectedShape?.type === 'polyLine' && (
        <PolylineInfoLayout points={selectedShape?.points} />
      )}

      <div className="button-cover">
        <SecondaryOutlinedButton text={"Update"} icon={<GrUpdate />} />
      </div>

      {/* Color Section */}
      <div className="label my-2 font-roboto bold-roboto">Color</div>
      <div className="wrap flex gap-3 justify-between">
        <input
          type="color"
          name="color"
          id="color"
          onChange={handleColorChange}
          value={shapeColor}
        />
        <div className="font-roboto">{shapeColor}</div>
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          id="opacity"
          className="font-poppins bg-white text-center rounded"
          value={shapeOpacity * 100} // Display as percentage
          onChange={handleOpacityChange}
        />
      </div>

      <div className="btn-line my-3"></div>
      <SecondaryOutlinedButton text={"Hide"} icon={<LuEye />} />
      <SecondaryOutlinedButton text={"Delete"} icon={<IoTrashOutline />} />
    </div>
  );
});

export default ShapeInfo;