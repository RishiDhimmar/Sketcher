import * as THREE from "three";
import { ShapeClass } from "./ShapeClass";
import shapeStore from "../../../Stores/ShapeStore";
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

export class PolyLineClass extends ShapeClass {
  static count = 0;

  constructor(name = "PolyLine", type = "polyLine", color = "#ff0000") {
    super(name, type, color);
    this.points = []; // Store as THREE.Vector3 objects
    PolyLineClass.count++;
    this.setName("Polyline " + PolyLineClass.count);
  }

  drawPolyLine(points = this.points) {
    if (points.length === 0) {
      return null;
    }

    // Convert THREE.Vector3 points to a flat array
    const positions = [];
    points.forEach(point => {
      positions.push(point.x, point.y, point.z);
    });

    const geometry = new LineGeometry();
    geometry.setPositions(positions);

    const material = new LineMaterial({
      color: this.color,
      linewidth: 4,
      transparent: true,
    });

    this.mesh = new Line2(geometry, material);
    this.mesh.computeLineDistances(); // Required for some shader effects
    this.setId();
    return this.mesh;
  }

  updatePolyLine(newPoint) {
    if (this.mesh && this.points.length > 0) {
      // Update the last point

      const tempPoint = new THREE.Vector3(newPoint.x, newPoint.y, newPoint.z);
      this.points[this.points.length - 1] = tempPoint;
     
      // Convert THREE.Vector3 points to a flat array
      const positions = [];
      this.points.forEach(point => {
        positions.push(point.x, point.y, point.z);
      });

      const geometry = new LineGeometry();
      geometry.setPositions(positions);

      this.mesh.geometry.dispose();
      this.mesh.geometry = geometry;
      
    }
  }

  updatePolyLinePointChange() {
    if (this.mesh && this.points.length > 0) {
      // Convert THREE.Vector3 points to a flat array
      const positions = [];
      this.points.forEach(point => {
        positions.push(point.x, point.y, point.z);
      });

      // Update the existing geometry
      // debugger
      this.mesh.geometry.setPositions(positions);
      this.mesh.geometry.attributes.position.needsUpdate = true;
    }
  }

  polyLineMouseMove(scene, intersectionPoint, newIntersection) {
    if (!newIntersection || !(newIntersection instanceof THREE.Vector3)) {
      console.error("Invalid intersection point.");
      return;
    }
    
    if (!this.mesh) {
      this.points.push(new THREE.Vector3(newIntersection.x, newIntersection.y, newIntersection.z));
      const temp = this.drawPolyLine(this.points);
      if (temp) {
        scene.add(temp);
      }
    } else {
      this.updatePolyLine(newIntersection);
    }
  }

  polyLineOnClick(scene, intersectionPoint) {
    if (!intersectionPoint || !(intersectionPoint instanceof THREE.Vector3)) {
      console.error("Invalid intersection point.");
      return;
    }
    // debugger
    this.points.push(intersectionPoint);
  }

  stopDrawing() {
    if (this.points.length > 0) {
      console.log(this.points)
      this.points.pop(); 
      // this.updatePolyLinePointChange(); // Update the geometry
      shapeStore.setSelectedShape(this._id);
    }
  }

  setPoints(points) {
    this.points = points;
  }
}