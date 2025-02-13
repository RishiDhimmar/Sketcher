import shapeStore from "../Stores/ShapeStore";

export const updateShapeOpacity = (newOpacity) => {
  console.log("newOpacity", newOpacity);

  // Ensure newOpacity is between 0 and 1
  if (newOpacity < 0 || newOpacity > 100) {
    console.error("Opacity value must be between 0 and 1");
    return;
  }

  const selectedShape = shapeStore.shapeMap.get(shapeStore.selectedShape);

  // Check if selectedShape and mesh exist
  if (selectedShape && selectedShape.mesh && selectedShape.mesh.material) {
    const { material } = selectedShape.mesh;

    // Ensure the material is capable of transparency
    material.transparent = true;
    material.opacity = newOpacity;

    console.log("Updated mesh:", selectedShape.mesh);
  } else {
    console.error("Selected shape or mesh is not valid");
  }
};
