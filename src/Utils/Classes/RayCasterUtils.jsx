import * as THREE from 'three';
// import RedDot from './RedDot';


export class RaycasterUtils {
  static handleClick(mouse, camera, plane, redDot, scene) {
    const rayCaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2(mouse.moux, mouse.mouy);

    rayCaster.setFromCamera(mouseVector, camera);
    // console.log(raycaster)
    const intersects = rayCaster.intersectObject(plane);

    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;

      if (redDot && scene) {
        const newRedDot = redDot.create(intersectionPoint);
        scene.add(newRedDot);
      } else {
        console.error("redDot or scene is undefined");
      }

      return intersectionPoint; 
    }

    return null; 
  }
}
