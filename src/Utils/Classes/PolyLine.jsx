import * as THREE from "three";

export class PolyLineClass {
  constructor() {
    this.points = [];
    this.mesh = null;
  }

  drawPolyLine(points = this.points) {
    if (points.length === 0) {
      return null;
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: "red",
      linewidth: 1, // Consider using lineWidth, but note browser support
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
    if (this.mesh) {
      this.mesh = null;
      this.points = [];
    }
  }
}