import * as THREE from "three";
import { ShapeClass } from "./ShapeClass";

export class EllipseClass extends ShapeClass{
  static count = 0;
  centerPoint;
  radiusX;
  radiusY;
  // mesh;

  constructor(name = "Ellipse", type = "ellipse", color = "#ff0000", opacity = 100) {
    super(name  , type, color, opacity);
    this.centerPoint = null;
    this.radiusX = null;
    this.radiusY = null;
    this.mesh = null;
    EllipseClass.count++;
    this.setName("Ellipse " + EllipseClass.count)
  }

  // TODO : after one creation the drawing should stop
  drawEllipse(centerPointX, centerPointZ, radiusX, radiusY, scene) {
    const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY);

    const points = curve.getPoints(50);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: "#ff0000", transparent: true, opacity: this.opacity });

    const ellipse = new THREE.Line(geometry, material);
    
    ellipse.position.set(centerPointX, 0 , centerPointZ);
    
    ellipse.rotateX(-Math.PI / 2);
    
    this.mesh = ellipse;

    this.setId()
    
    scene.add(ellipse);

    return ellipse;
  }

  updateEllipse(  radiusTempX, radiusTempY) {
    if (!this.centerPoint) return;

    const curve = new THREE.EllipseCurve(0,0, radiusTempX, radiusTempY);

    const points = curve.getPoints(50);

    const newGeometry = new THREE.BufferGeometry().setFromPoints(points);

    this.mesh.geometry.dispose();

    this.mesh.geometry = newGeometry;

    this.mesh.position.set(this.centerPoint.x, 0.1, this.centerPoint.z);
  }

  ellipseOnMouseMove(scene, centerPoint, intersectionPoint) {


    const radiusTemp = this.centerPoint.distanceTo(intersectionPoint);
    if(!this.mesh) {
      this.mesh = this.drawEllipse(
        centerPoint.x,
        centerPoint.z,
        radiusTemp,
        radiusTemp,
        scene
      );
    }
    if (!this.radiusX ) {
      this.updateEllipse(radiusTemp, radiusTemp);
    } else if(!this.radiusY) {
      this.updateEllipse(this.radiusX, radiusTemp);
    }
  }

  ellipseOnClick(scene, intersectionPoint) {
    if (!this.centerPoint) {
      this.centerPoint = intersectionPoint;
    } else if (!this.radiusX) {
      this.radiusX = intersectionPoint.distanceTo(this.centerPoint);
    } else if(!this.radiusY) {
      this.radiusY = intersectionPoint.distanceTo(this.centerPoint);
      return this._id
    } 

  }
  setCenterPoint(centerPoint) {
    this.centerPoint = centerPoint;
  }

  setRadiusX(radiusX) {
    this.radiusX = radiusX;
  }

  setRadiusY(radiusY) {
    this.radiusY = radiusY;
  }
}
