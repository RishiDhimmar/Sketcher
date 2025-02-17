import { temp } from "three/tsl";
import shapeStore from "../Stores/ShapeStore";
import { LineClass } from "./Classes/Shape/LineClass";
import { ShapeClass } from "./Classes/Shape/ShapeClass";
import { SHAPES_INFO } from "./Classes/Shape/ShapeInfo";
import { ThreeSketcherClass } from "./Classes/ThreeSketcherClass";
import { CircleClass } from "./Classes/Shape/CircleClass";
import { EllipseClass } from "./Classes/Shape/EllipseClass";
import { PolyLineClass } from "./Classes/Shape/PolyLine";

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
    selectedShape.opacity = newOpacity;
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
    // shapeStore.setSelectedShape(selectedShape._id);
    console.log(shapeStore.selectedShape);
    
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
export const handleEllipseChangeFunctionality = (
  centerPoint,
  radiusX,
  radiusY
) => {
  const tempEllipse = shapeStore.shapeMap.get(shapeStore.selectedShape);
  if (!tempEllipse) return;
  tempEllipse.setCenterPoint(centerPoint);
  tempEllipse.setRadiusX(radiusX);
  tempEllipse.setRadiusY(radiusY);
  tempEllipse.updateEllipse(radiusX, radiusY);
};

export const handlePolyLineChangeFunctionality = (points) => {
  const tempPolyLine = shapeStore.shapeMap.get(shapeStore.selectedShape);
  if (!tempPolyLine) return;
  console.log(points);
  tempPolyLine.setPoints(points);
  tempPolyLine.updatePolyLinePointChange();
};

export const handleFileUpload = (data) => {
  const scene = ThreeSketcherClass.scene;
  ShapeClass?.meshes?.map((shape) => {
    scene.remove(shape);
  });
  
  ShapeClass.meshes = [];
  LineClass.count = 0;
  CircleClass.count = 0;
  EllipseClass.count = 0;
  PolyLineClass.count = 0;
  
  shapeStore.reset();
  console.log(data)

  let tempShape = null;

  data.map((temp) => {
    console.log(temp.type);
    // debugger
    switch (temp.type) {
      case SHAPES_INFO.LINE:
        tempShape = new LineClass(temp.name, temp.type, temp.color, temp.opacity);
        tempShape.setMp1(temp.mp1);
        tempShape.setMp2(temp.mp2);
        tempShape.drawLine(temp.mp1, temp.mp2, scene);
        break;
      case SHAPES_INFO.CIRCLE:
        tempShape = new CircleClass(temp.name, temp.type, temp.color, temp.opacity);
        tempShape.setCenterPoint(temp.centerpoint);
        tempShape.setRadius(temp.radius);
        tempShape.drawCircle(temp.centerpoint, temp.radius, temp.name, temp.color, scene);
        break;
      case SHAPES_INFO.ELLIPSE:
        console.log(temp)
        tempShape = new EllipseClass(temp.name, temp.type, temp.color, temp.opacity);
        tempShape.setCenterPoint(temp.centerPoint);
        tempShape.setRadiusX(temp.radiusX);
        tempShape.setRadiusY(temp.radiusY);
        tempShape.drawEllipse(temp.centerPoint.x, temp.centerPoint.y, temp.radiusX, temp.radiusY, scene);
        tempShape.updateEllipse(temp.radiusX, temp.radiusY);
        break;
      case SHAPES_INFO.POLYLINE:
        console.log(temp);
        tempShape = new PolyLineClass(temp.name, temp.type, temp.color, temp.opacity);
        temp.points.pop()
        tempShape.setPoints(temp.points);
        tempShape.drawPolyLine(temp.points, scene);

        break;
    }
  });
};