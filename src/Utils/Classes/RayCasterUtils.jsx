import * as THREE from "three";
import shapeStore from "../../Stores/ShapeStore";
import { ShapeClass } from "./Shape/ShapeClass";

export class RaycasterUtils {
  // static handleClick(mouse, camera, plane, redDot, scene, shape) {
  //   // Validate inputs
  //   if (
  //     !mouse ||
  //     typeof mouse.moux !== "number" ||
  //     typeof mouse.mouy !== "number"
  //   ) {
  //     console.error("Invalid mouse object or properties");
  //     return null;
  //   }
  //   if (!camera || !scene) {
  //     console.error("Camera or scene is undefined");
  //     return null;
  //   }
  //   if (!scene.children || scene.children.length === 0) {
  //     console.error("Scene has no children");
  //     return null;
  //   }

  //   const rayCaster = new THREE.Raycaster();
  //   const mouseVector = new THREE.Vector2(mouse.moux, mouse.mouy);
  //   rayCaster.setFromCamera(mouseVector, camera);

  //   const intersects = rayCaster.intersectObjects(scene.children);

  //   if (intersects.length > 0) {
  //     const intersectionPoint = intersects[0].point;

  //     const selectTemp = intersects.find((intersect) => {
  //       return intersect.object.name !== "Plane";
  //     });

  //     if (selectTemp) {
  //       shapeStore.setSelectedShape(selectTemp.object.uuid);
  //     }
  //     return intersectionPoint;
  //   }

  //   console.warn("No intersections found");
  //   return null;
  // }
  static handleClick(mouse, camera, plane, redDot, scene, shape) {
    if (!mouse || !camera || !scene) {
      console.error("Invalid inputs");
      return null;
    }

    const rayCaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2(mouse.moux, mouse.mouy);

    rayCaster.setFromCamera(mouseVector, camera);
    // console.log(ShapeClass.meshes)

    const intersects = rayCaster.intersectObjects([
      plane,
      ...ShapeClass.meshes,
    ]);

    if (intersects.length >= 1) {
      // const selectTemp = intersects[1]
      // console.log(selectTemp)

      // if (selectTemp) {
      //   shapeStore.setSelectedShape(selectTemp.object.uuid);
      // }

      // return intersects[0].point;
      console.log(intersects)
      const planeIntersection = intersects.find((intersect) => {
        return intersect.object.name === "Plane";
      });
      const shapeIntersection = intersects.find((intersect) => {
        return intersect.object.name !== "Plane";
      });

      if (shapeIntersection) {
        shapeStore.setSelectedShape(shapeIntersection.object.uuid);
      }

      if (planeIntersection) {
        return planeIntersection.point;
      }
    }

    console.warn("No intersections found");
    return null;
  }
}
