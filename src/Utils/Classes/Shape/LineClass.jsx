import { ShapeClass } from "./ShapeClass";
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

export class LineClass extends ShapeClass {
  static count = 0;

  constructor(name = "Line", type = "line", color = "#ff0000", opacity = 100) {
    super(name, type, color, opacity);
    this.mp1 = null;
    this.mp2 = null;
    LineClass.count++;
    this.setName("Line " + LineClass.count);
  }

  drawLine(ip1, ip2,scene) {
    if (!ip1 || !ip2) {
      return;
    }

    const geometry = new LineGeometry();
    geometry.setPositions([ip1.x, 0.1, ip1.z, ip2.x, 0.1, ip2.z]);

    const material = new LineMaterial({
      color: this.color,
      linewidth: 4, 
      transparent: true,
      opacity : this.opacity,
    });

    this.mesh = new Line2(geometry, material);
    this.mesh.computeLineDistances(); 
    this.setId();
    scene.add(this.mesh);
    return this.mesh;
  }

  updateLine(startPoint, newPoint) {
    if (!startPoint || !newPoint) {
      return;
    }

    this.mp1 = startPoint;
    this.mp2 = newPoint;

    this.mesh.geometry.setPositions([
      startPoint.x, 0.1, startPoint.z,
      newPoint.x, 0.1, newPoint.z,
    ]);

    this.mesh.geometry.attributes.position.needsUpdate = true;
  }

  lineMouseMove(scene, intersectionPoint, newIntersection) {
    if (!this.mesh) {
      const temp = this.drawLine(this.mp1, newIntersection, scene);
      if (temp) {
        scene.add(temp);
      }
    } else {
      this.updateLine(intersectionPoint, newIntersection);
    }
  }

  lineOnClick(scene, points, intersectionPoint) {
    if (!this.mp1) {
      this.mp1 = intersectionPoint;
      this.mp2 = null;
    } else {
      this.mp2 = intersectionPoint;
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