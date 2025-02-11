import * as THREE from "three";

export class PolyLineClass {
  points = [];
  secondClick = false;
  mesh = null;

  drawPolyLine(points = this.points) {
    if (points.length == 0) {
      return;
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: "red",
      linewidth: 1,
    });
    this.mesh = new THREE.Line(geometry, material);
    return this.mesh;
  }

  updatePolyLine(newPoint) {
    if (this.mesh) {
      this.points.push(newPoint);
      const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
      this.mesh.geometry.dispose();
      this.mesh.geometry = geometry;
      // this.mesh.geometry.attributes.position.needsUpdate = true;
    }
  }

  polyLineMouseMove(scene, intersectionPoint, newIntersection) {
    if (!this.mesh) {
      const temp = this.drawPolyLine([...[this.points], newIntersection]);
      if (temp) {
        scene.add(temp);
      }
    } else {
      this.updatePolyLine(newIntersection);
    }
  }

  polyLineOnClick(scene, points, intersectionPoint) {
    if (this.secondClick) {
      // points = [];
      console.log("second click");
      this.secondClick = false;
      this.points = []
      this.mesh = null;
      intersectionPoint = null
      return true;
    }

    if (!this.secondClick) {
      this.secondClick = true;
    }
    this.points.push(intersectionPoint);

  }
}
