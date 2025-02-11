import * as THREE from "three";
import { ThreeSketcherClass } from "./Classes/ThreeSketcherClass";


export const threeSetup = (canvas) => {
  const msketcher = new ThreeSketcherClass(canvas);

  msketcher.updateRenderer();
};
