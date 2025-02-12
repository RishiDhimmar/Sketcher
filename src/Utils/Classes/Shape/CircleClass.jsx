import { ShapeClass } from "./ShapeClass";
import * as THREE from "three";

export class CircleClass extends ShapeClass  {
  centerpoint;
  radius;
  mesh;


  constructor(name = "Circle", type = "circle", color = "red") {
    super(name, type, color);
    this.centerpoint = null;
    this.radius = null;
    this.mesh = null;
  }

  drawCircle(centerpoint, radius, name, color, scene) {
    const geometry = new THREE.CircleGeometry(radius, 50);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.set(centerpoint.x, centerpoint.y, centerpoint.z);
    circle.rotation.x = -Math.PI / 2;
    this.mesh = circle;
    scene.add(this.mesh);
    return circle;
  }

  updateCircle(centerpoint, radius) {
    if (!centerpoint) return;
    const newGeometry = new THREE.CircleGeometry(radius, 50);
    this.mesh.geometry.dispose();
    this.mesh.geometry = newGeometry;
    this.mesh.position.set(centerpoint.x, centerpoint.y, centerpoint.z);
  }


  circleOnMouseMove(centerPoint, intersectionPoint, scene) {


    const radius = centerPoint.distanceTo(intersectionPoint);
    if (!this.mesh) {
      this.drawCircle(intersectionPoint, radius, "circle", "orange", scene);
    } else {
      this.updateCircle(this.centerpoint, radius);
    }
  }

  circleOnClick(intersectionPoint) {
    
    if (!this.centerpoint) {
      this.centerpoint = intersectionPoint;
    } else {
      this.radius = intersectionPoint.distanceTo(this.centerpoint);
    }
    if (this.radius && this.centerpoint) {
      intersectionPoint = null;
      return true;
    }
  }
}
