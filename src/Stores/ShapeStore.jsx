import { makeAutoObservable } from "mobx";
import { SHAPES_INFO } from "../Utils/Classes/Shape/ShapeInfo";

class ShapeStore {
    shape = SHAPES_INFO.NULL

    constructor() {
        makeAutoObservable(this)
    }

    setShape(shape) {
        this.shape = shape
    }

    get getShape() {
        return this.shape
    }

}

const shapeStore = new ShapeStore();
export default shapeStore;