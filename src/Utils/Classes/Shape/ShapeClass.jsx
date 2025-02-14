import uniqid from "uniqid"
import shapeStore from "../../../Stores/ShapeStore";
import { get } from "mobx";
// import * as THREE from "three";

export class ShapeClass {
  _id = null;
  name = null;
  type = null;
  color = null;
  mesh = null;
  opacity = null;
  isEntity = true;
  static meshes = []


  constructor( name = "null", type = "null", color = "null", opacity = 100) {
 
    this._id = null;
    this.name = name;
    this.type = type;
    this.color = color;
    this.opacity = opacity
    
  }
  setColor(color) {
    this.color = color;
    console.log(this.mesh)
  }
  setOpacity(opacity) {
    this.opacity = opacity;
  }
  setName(name) {
    this.name = name
  }
  setId() {
    this._id = this.mesh.uuid;
    ShapeClass.meshes.push(this.mesh)

    // this.shapeMap.set(this._id, this)
    shapeStore.addShapeToMap(this)
    console.log(shapeStore.getShapeMap)
  }

  getName() {
    return this.name
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

  getMeshes () {
    const temp = Array.from(shapeStore.shapeMap.values.mesh)
    console.log(temp)
  }


}
