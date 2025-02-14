import * as THREE from "three";
import shapeStore from "../../Stores/ShapeStore";
import { ShapeClass } from "./Shape/ShapeClass";

export class RaycasterUtils {
  static handleClick(mouse, camera, plane, redDot, scene, shape) {
    if (!mouse || !camera || !scene) {
      console.error("Invalid inputs");
      return null;
    }

    const rayCaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2(mouse.moux, mouse.mouy);

    rayCaster.setFromCamera(mouseVector, camera);
    console.log("meshes", ShapeClass.meshes)
    const intersects = rayCaster.intersectObjects([
      plane,
      ...ShapeClass.meshes,
    ]);

    if (intersects.length >= 1) {
      console.log(intersects);
      const planeIntersection = intersects.find((intersect) => {
        return intersect.object.name === "Plane";
      });
      if (shape == null) {
        const shapeIntersection = intersects.find((intersect) => {
          return intersect.object.name !== "Plane";
        });

        if (shapeIntersection) {
          shapeStore.setSelectedShape(shapeIntersection.object.uuid);
        }
      }

      if (planeIntersection) {
        return planeIntersection.point;
      }
    }

    console.warn("No intersections found");
    return null;
  }
}
