import shapeStore from "../Stores/ShapeStore";

export const updateShapeOpacity = (newOpacity) => {
  console.log("newOpacity", newOpacity);

  if (newOpacity < 0 || newOpacity > 100) {
    console.error("Opacity value must be between 0 and 1");
    return;
  }

  const selectedShape = shapeStore.shapeMap.get(shapeStore.selectedShape);

  if (selectedShape && selectedShape.mesh && selectedShape.mesh.material) {
    const { material } = selectedShape.mesh;

    material.transparent = true;
    material.opacity = newOpacity;
    shapeStore.setUpdateFlag(!shapeStore.updateFlag);

  } else {
    console.error("Selected shape or mesh is not valid");
  }
};

export const handleVisibilityChangeFunctionality = (selectedShape, isVisible) => {
  if (selectedShape) {
    selectedShape.mesh.visible = isVisible;
    console.log(selectedShape.mesh);
    shapeStore.setUpdateFlag(!shapeStore.updateFlag);
  }
}

