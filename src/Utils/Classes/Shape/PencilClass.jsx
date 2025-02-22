import * as THREE from "three";
import { ShapeClass } from "./ShapeClass";

export class PencilClass extends ShapeClass{
  points = [];
  secondClick = false;
  mesh = null;

  constructor(name = "Pencil", type = "pencil", color = "#ff0000")
 {
  super(name, type, color);
 }
  drawPencil(points = this.points) {
    if (points.length == 0) {
      return;
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: "#ff0000",
      linewidth: 1,
      transparent: true
    });
    this.mesh = new THREE.Line(geometry, material);
    return this.mesh;
  }

  updatePencil(newPoint) {
    if (this.mesh) {
      this.points.push(newPoint);
      const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
      this.mesh.geometry.dispose();
      this.mesh.geometry = geometry;
      // this.mesh.geometry.attributes.position.needsUpdate = true;
    }
  }

  pencilMouseMove(scene, intersectionPoint, newIntersection) {
    if (!this.mesh) {
      const temp = this.drawPencil([...[this.points], newIntersection]);
      if (temp) {
        scene.add(temp);
      }
    } else {
      this.updatePencil(newIntersection);
    }
  }

  pencilOnClick(scene, points, intersectionPoint) {
    if (this.secondClick) {
      // points = [];
      // console.log("second click");
      this.secondClick = false;
      this.points = []
      this.mesh = null;
      intersectionPoint = null
      return this._id;
    }

    if (!this.secondClick) {
      this.secondClick = true;
    }
    this.points.push(intersectionPoint);

  }
}
