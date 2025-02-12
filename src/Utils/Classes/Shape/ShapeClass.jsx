import uniqid from "uniqid"
import shapeStore from "../../../Stores/ShapeStore";
// import * as THREE from "three";

export class ShapeClass {
  _id = null;
  name = null;
  type = null;
  color = null;
  mesh = null;
  opacity = null
  static shapeMap = new Map()


  constructor( name = "null", type = "null", color = "null", opacity = 100) {
 
    this._id = uniqid()
    this.name = name;
    this.type = type;
    this.color = color;
    this.opacity = opacity
    shapeStore.addShapeToMap(this)
  }

  
  setColor(color) {
    this.color = color;
    console.log(this.mesh)
  }
  setOpacity(opacity) {
    this.opacity = opacity;
  }

  getColor() {
    return this.color;
  }
  getOpacity() {
    return this.opacity;
  }

  getMesh() {
    return this.mesh;
  }
}
