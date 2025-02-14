import * as THREE from 'three';

export default class Plane {
  constructor() {
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 'white' });
    this.mesh = new THREE.Mesh(planeGeometry, planeMaterial);
    this.mesh.name = "Plane"
    this.mesh.rotation.x = -Math.PI / 2;
  }

  getMesh() {
    return this.mesh;
  }
}
