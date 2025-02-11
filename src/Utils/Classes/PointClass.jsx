import * as THREE from "three";

export class PointClass {
  x = null;
  y = null;
  z = null;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toVector3() {
    return new THREE.Vector3(this.x, this.y, this.z);
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getZ() {
    return this.z;
  }

  
}
