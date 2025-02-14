import * as THREE from 'three';

export default class RedDot {
  create() {
    const geometry = new THREE.CircleGeometry(0.1);
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const redDot = new THREE.Mesh(geometry, material);
    redDot.rotation.x = -(Math.PI / 2);
    // redDot.position.copy(position);
    return redDot;
  }
}
