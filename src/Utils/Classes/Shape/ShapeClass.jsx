import uniqid from "uniqid"
import shapeStore from "../../../Stores/ShapeStore";

export class ShapeClass {
  _id = null;
  name = null;
  type = null;
  color = null;
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

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
  }
  getOpacity() {
    return this.opacity;
  }
  setOpacity(opacity) {
    this.opacity = opacity;
  }
}
