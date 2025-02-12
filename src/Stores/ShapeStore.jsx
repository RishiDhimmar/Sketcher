import { makeAutoObservable } from "mobx";
import { SHAPES_INFO } from "../Utils/Classes/Shape/ShapeInfo";

class ShapeStore {
  shape = SHAPES_INFO.NULL;
  selectedShape = null;
  shapeMap = new Map();
  deleteFlag = false;

  constructor() {
    makeAutoObservable(this);
  }

  setShape(shape) {
    this.shape = shape;
  }

  setSelectedShape(shape) {
    this.selectedShape = shape;
  }
  setDeleteFlag(flag) {
    this.deleteFlag = flag;
  }

  addShapeToMap(shape) {
    this.shapeMap.set(shape._id, shape);
  }

  removeShapeFromMap(shape) {
    this.shapeMap.delete(shape._id);
  }

  get getShape() {
    return this.shape;
  }
  get getShapeMap() {
    return this.shapeMap;
  }
}

const shapeStore = new ShapeStore();
export default shapeStore;
