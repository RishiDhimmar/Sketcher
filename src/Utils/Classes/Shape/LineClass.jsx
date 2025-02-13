import * as THREE from "three";
import { ShapeClass } from "./ShapeClass";

export class LineClass extends ShapeClass {
  static count = 0
  constructor(name = "Line", type = "line", color = "#ff0000") {
    super(name, type, color);
    this.mp1;
    this.mp2;
    LineClass.count++;
    // this.mesh = null;
    this.setName("Line " + LineClass.count)
  }

  drawLine(ip1, ip2) {
    if (!ip1 || !ip2) {
      return;
    }

    const geometry = new THREE.BufferGeometry().setFromPoints([ip1, ip2]);
    const material = new THREE.LineBasicMaterial({
      color: "#ff0000",
      linewidth: 1,
      transparent: true
    });
    this.mesh = new THREE.Line(geometry, material);
    return this.mesh;
  }

  // updateLine(newPoint) {
  //   const positions = this.mesh.geometry.attributes.position.array;
  //   positions[3] = newPoint.x;
  //   positions[4] = newPoint.y;
  //   positions[5] = newPoint.z;

  //   this.mesh.geometry.attributes.position.needsUpdate = true;
  // }
  updateLine(startPoint,newPoint) {

    if (!startPoint || !newPoint) {
      return;
    }
    this.mp1 = startPoint;
    this.mp2 = newPoint
    const positions = this.mesh.geometry.attributes.position.array;
    
    positions[0] = startPoint.x;
    positions[1] = startPoint.y;
    positions[2] = startPoint.z;
    positions[3] = newPoint.x;
    positions[4] = newPoint.y;
    positions[5] = newPoint.z;

    this.mesh.geometry.attributes.position.needsUpdate = true;
  }

  lineMouseMove(scene, intersectionPoint, newIntersection) {
    if (!this.mesh) {
      const temp = this.drawLine(this.mp1, newIntersection);
      if (temp) {
        scene.add(temp);
      }
    } else {
      this.updateLine(intersectionPoint,newIntersection);
    }
  }


  // TODO : Has unexpected behavior when two lines are drawn with in-between clicking
  lineOnClick(scene, points, intersectionPoint) {
    if (!this.mp1) {
      this.mp1 = intersectionPoint;
      this.mp2 = null;
    } else {
      this.mp2 = intersectionPoint;
      // this.points.push(this.mp2);
    }

    if (this.mp1 && this.mp2) {

      intersectionPoint = null;
      return this._id;
    }

  }


  getPoints() {
    return [this.mp1, this.mp2];
  }

  getMesh() {
    return this.mesh;
  }

  setMp1(mp1) {
    this.mp1 = mp1;
  }

  setMp2(mp2) {
    this.mp2 = mp2;
  }
}
