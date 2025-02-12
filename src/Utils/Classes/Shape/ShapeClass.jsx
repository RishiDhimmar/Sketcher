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
    // if (!_id) {
    //   throw new Error("Found null id for a Shape");
    // }
    this._id = uniqid()
    this.name = name;
    this.type = type;
    this.color = color;
    this.opacity = opacity

    shapeStore.addShapeToMap(this)
    // console.log(shapeStore.shapeMap)
    
  }

  
  

  getColor() {
    return this.color;
  }
  getOpacity() {
    return this.opacity;
  }
  setOpacity(opacity) {
    this.opacity = opacity;
  }
}
