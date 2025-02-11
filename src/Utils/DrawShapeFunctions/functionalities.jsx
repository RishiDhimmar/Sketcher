import * as THREE from "three";
import { LineClass } from "../Classes/LineClass";
import { CircleClass } from "../Classes/CircleClass";
import { PencilClass } from "../Classes/PencilClass";

const addMeshToScene = (scene, mesh) => {
  scene.add(mesh);
};
const drawLine = (points, name, color, scene) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: 1,
  });
  const line = new THREE.Line(geometry, material);
  addMeshToScene(scene, line);
  const lineObj = new LineClass(points[0], points[1], name, "line", color);
  return [line, lineObj];
};

const drawCircle = (centerpoint, radius, name, color, scene) => {
  const geometry = new THREE.CircleGeometry(radius, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const circle = new THREE.Mesh(geometry, material);

  circle.position.set(
    centerpoint.getX(),
    centerpoint.getY(),
    centerpoint.getZ()
  );
  addMeshToScene(scene, circle);
  const circleObj = new CircleClass(centerpoint, radius, name, "circle", color);
  return [circle, circleObj];
};

const drawPencil = (points, name, color, scene) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: 1,
  });
  const line = new THREE.Line(geometry, material);
  addMeshToScene(scene, line);
  const lineObj = new PencilClass(
    points[0],
    points[1],
    name,
    "polyline",
    color
  );
  return [line, lineObj];
};
export { drawLine, drawCircle, drawPencil };
