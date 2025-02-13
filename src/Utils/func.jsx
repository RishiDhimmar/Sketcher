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

export const handleVisibilityChangeFunctionality = (
  selectedShape,
  isVisible
) => {
  if (selectedShape) {
    selectedShape.mesh.visible = isVisible;
    console.log(selectedShape.mesh);
    shapeStore.setUpdateFlag(!shapeStore.updateFlag);
  }
};

export const handleLineChangeFunctionality = (startPoint, endPoint) => {
  const tempLine = shapeStore.shapeMap.get(shapeStore.selectedShape);
  if (!tempLine) return;
  tempLine.setMp1(startPoint);
  tempLine.setMp2(endPoint);
  tempLine.updateLine(startPoint, endPoint);
};
export const handleCircleChangeFunctionality = (centerPoint, radius) => {
  const tempCircle = shapeStore.shapeMap.get(shapeStore.selectedShape);
  if (!tempCircle) return;
  tempCircle.setCenterPoint(centerPoint);
  tempCircle.setRadius(radius);
  tempCircle.updateCircle(centerPoint, radius);
};
export const handleEllipseChangeFunctionality = (centerPoint, radiusX, radiusY) => {
  const tempEllipse = shapeStore.shapeMap.get(shapeStore.selectedShape); 
  if(!tempEllipse) return;
  tempEllipse.setCenterPoint(centerPoint);
  tempEllipse.setRadiusX(radiusX);
  tempEllipse.setRadiusY(radiusY);
  tempEllipse.updateEllipse(radiusX, radiusY);
}

export const handlePolyLineChangeFunctionality = (points) => {
  const tempPolyLine = shapeStore.shapeMap.get(shapeStore.selectedShape); 
  if(!tempPolyLine) return;
  console.log(points)
  tempPolyLine.setPoints(points);
  tempPolyLine.updatePolyLinePointChange();
}
