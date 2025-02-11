import { Object3D } from "three";
import uniqid from "uniqid"

export class ShapeClass {
  _id = null;
  name = null;
  type = null;
  color = null;
  opacity = null
  static shapeMap = new Map()

  constructor( name = "null", type = "null", color = "null", opacity = 100) {
    // if (!_id) {
    //   throw new Error("Found null id for a Shape");
    // }
    this._id = uniqid()
    this.name = name;
    this.type = type;
    this.color = color;
    this.opacity = opacity

    ShapeClass.setShapesData(this)
    console.log(ShapeClass.getShapesData())
    
  }

  static setShapesData(shape) {
    this.shapeMap.set(shape._id, shape)
  }

  static getShapesData() {
    return this.shapeMap
  }

  getColor() {
    return this.color;
  }
}
