import * as THREE from "three";

export class RaycasterUtils {
  static handleClick(mouse, camera, plane, redDot, scene, shape) {
    const rayCaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2(mouse.moux, mouse.mouy);

    rayCaster.setFromCamera(mouseVector, camera);
    const intersects = rayCaster.intersectObject(plane);

    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;
      // if (shape) {
      //   if (redDot && scene) {
      //     const newRedDot = redDot.create(intersectionPoint);
      //     scene.add(newRedDot);
      //   } else {
      //     console.error("redDot or scene is undefined");
      //   }
      // }

      return intersectionPoint;
    }

    return null;
  }
}
