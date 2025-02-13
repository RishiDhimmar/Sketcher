import * as THREE from "three";
import { ShapeClass } from "./ShapeClass";
import shapeStore from "../../../Stores/ShapeStore";

export class PolyLineClass extends ShapeClass {
  static count = 0
  constructor(name = "PolyLine", type = "polyLine", color = "#ff0000", ) {
    super(name, type, color);
    this.points = [];
    PolyLineClass.count++;
    this.setName("Polyline " + PolyLineClass.count)
  }


  drawPolyLine(points = this.points) {
    if (points.length === 0) {
      return null;
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: this.color,
      linewidth: 1, 
      transparent: true

    });
    this.mesh = new THREE.Line(geometry, material);
    return this.mesh;
  }

  updatePolyLine(newPoint) {
    if (this.mesh && this.points.length > 0) {
      this.points[this.points.length - 1] = newPoint;
      const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
      this.mesh.geometry.dispose();
      this.mesh.geometry = geometry;
    }
  }
  updatePolyLinePointChange() {
    if (this.mesh && this.points.length > 0) {
      const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
      this.mesh.geometry.dispose();
      this.mesh.geometry = geometry;
    }
  }

  polyLineMouseMove(scene, intersectionPoint, newIntersection) {
    if (!this.mesh) {
      this.points.push(newIntersection);
      const temp = this.drawPolyLine(this.points);
      if (temp) {
        scene.add(temp);
      }
    } else {
      this.updatePolyLine(newIntersection);
    }
  }

  polyLineOnClick(scene, intersectionPoint) {
    this.points.push(intersectionPoint);
  }
  stopDrawing() {
    const newPoints = this.points;
    newPoints.pop()
    this.updatePolyLine(newPoints)
    shapeStore.setSelectedShape(this._id)
  }
  setPoints(points) {
    this.points = points;
  }
}