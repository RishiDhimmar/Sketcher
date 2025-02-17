import * as THREE from "three";
import Plane from "./Plane";
import RedDot from "./RedDot";
import { RaycasterUtils } from "./RayCasterUtils";
import { LineClass } from "./Shape/LineClass";
import { CircleClass } from "./Shape/CircleClass";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { PencilClass } from "./Shape/PencilClass";
import { PolyLineClass } from "./Shape/PolyLine";
import { EllipseClass } from "./Shape/EllipseClass";
import { SHAPES_INFO } from "./Shape/ShapeInfo";
import shapeStore from "../../Stores/ShapeStore";
import { reaction } from "mobx";

export class ThreeSketcherClass {
  static scene = new THREE.Scene();
  constructor(canvas) {
    this.canvas = canvas;
    this.raycaster = new THREE.Raycaster();
    this.plane = new Plane();
    ThreeSketcherClass.scene.add(this.plane.getMesh());
    this.redDot = new RedDot().create();
    ThreeSketcherClass.scene.add(this.redDot);
    this.mouse = { moux: null, mouy: null };
    this.isDrawing = false;
    this.entityStatus = false;
    this.intersectionPoint = null;
    shapeStore.setShape(SHAPES_INFO.NULL);
    this.setShape(shapeStore.shape);

    this.setupCamera();
    this.setupRenderer();
    this.addEventListeners();
    this.updateRenderer();
    // this.setUpAxisHelpers();
    this.setUpControls();

    reaction(
      () => shapeStore.deleteFlag,
      (deleteFlag) => {
        if (deleteFlag) {
          this.deleteShape();
        }
      }
    );
  }

  

  setShape(newShape) {
    shapeStore.setShape(newShape);
    this.entityStatus = false;
    this.isDrawing = false;
  }

  deleteShape() {
    if (shapeStore.selectedShape && shapeStore.deleteFlag) {
      const shapeToDelete = shapeStore.shapeMap.get(shapeStore.selectedShape);

      if (shapeToDelete && shapeToDelete.mesh) {
        ThreeSketcherClass.scene.remove(shapeToDelete.mesh);

        shapeToDelete.mesh.geometry.dispose();
        shapeToDelete.mesh.material.dispose();

        shapeStore.removeShapeFromMap(shapeToDelete);

        shapeStore.setDeleteFlag(false);
        shapeStore.setSelectedShape(null);
      }
    }
  }

  setUpAxisHelpers() {
    const axesHelper = new THREE.AxesHelper(5);
    axesHelper.position.set(0,0,0);
    ThreeSketcherClass.scene.add(axesHelper);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      65,
      this.canvas.width / this.canvas.height,
      0.1,
      1000
    );
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.rotation.x = -Math.PI / 2;
    this.camera.position.y = 30;
    ThreeSketcherClass.scene.add(this.camera);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  addEventListeners() {
    window.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("click", this.onClick);
    this.canvas.addEventListener("dblclick", this.onDoubleClick);
    window.addEventListener("resize", this.onResize);
  }

  onDoubleClick = (e) => {
    e.preventDefault();
    console.log(this.isDrawing, this.entityStatus);
    if (this.isDrawing && this.entityStatus) {
      {
        this.polyLine.stopDrawing(ThreeSketcherClass.scene);
      }
      this.isDrawing = false;
      this.entityStatus = false;

      shapeStore.setShape(SHAPES_INFO.NULL);

    }
  };

  setUpControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enablePan= false;
    this.controls.enableRotate= false
  }

  updateMousePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.mouse = { moux: mouseX, mouy: mouseY };
  }

  getIntersectionPoint() {
    const mouseVector = new THREE.Vector2(this.mouse.moux, this.mouse.mouy);
    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(mouseVector, this.camera);

    const intersects = rayCaster.intersectObject(this.plane.getMesh());

    // console.log(intersects)

    if (intersects.length > 0) {
      return intersects[0].point;
    }
    return null;
  }

  handleShapeUpdate(newIntersection) {
    switch (shapeStore.shape) {
      case SHAPES_INFO.LINE:
        this.line.lineMouseMove(
          ThreeSketcherClass.scene,
          this.intersectionPoint,
          newIntersection
        );
        break;
      case SHAPES_INFO.CIRCLE:
        this.circle.circleOnMouseMove(
          this.intersectionPoint,
          newIntersection,
          ThreeSketcherClass.scene
        );
        break;
      case SHAPES_INFO.PENCIL:
        this.pencil.pencilMouseMove(
          ThreeSketcherClass.scene,
          this.intersectionPoint,
          newIntersection
        );
        break;
      case SHAPES_INFO.POLYLINE:
        this.polyLine.polyLineMouseMove(
          ThreeSketcherClass.scene,
          this.intersectionPoint,
          newIntersection
        );
        break;
      case SHAPES_INFO.ELLIPSE:
        this.ellipse.ellipseOnMouseMove(
          ThreeSketcherClass.scene,
          this.intersectionPoint,
          newIntersection
        );
        break;
    }
  }

  onMouseMove = (event) => {
    this.updateMousePosition(event);

    if ((shapeStore.shape)) {
    this.redDot.visible = true
    const mouseIntersection = this.getIntersectionPoint();
    if(!mouseIntersection) return
    this.redDot.position.set(
      mouseIntersection.x,
      0.01,
      mouseIntersection.z
    );
    } else {
    this.redDot.visible = false;
    }

    if (this.isDrawing && this.intersectionPoint) {
      const newIntersection = this.getIntersectionPoint();
      if (!newIntersection) return;

      this.handleShapeUpdate(newIntersection);
    }
  };

  initClass() {
    switch (shapeStore.shape) {
      case SHAPES_INFO.LINE:
        this.line = new LineClass();
        break;
      case SHAPES_INFO.CIRCLE:
        this.circle = new CircleClass();
        break;
      case SHAPES_INFO.PENCIL:
        this.pencil = new PencilClass();
        break;
      case SHAPES_INFO.POLYLINE:
        this.polyLine = new PolyLineClass();
        break;
      case SHAPES_INFO.ELLIPSE:
        this.ellipse = new EllipseClass();
        break;
    }
  }

  handleShapeCreation() {
    if (!this.entityStatus) {
      this.initClass();
      this.entityStatus = true;
    }

    const isShapeComplete = this.updateShape();
    // debugger
    if (isShapeComplete) {
      this.entityStatus = false;
      this.isDrawing = false;
      console.log(isShapeComplete);
      console.log("shape Completed")
      isShapeComplete && shapeStore.setSelectedShape(isShapeComplete);
      shapeStore.setShape(SHAPES_INFO.NULL);
    }
  }

  updateShape() {
    switch (shapeStore.shape) {
      case SHAPES_INFO.LINE:
        return this.line.lineOnClick(
          ThreeSketcherClass.scene,
          this.points,
          this.intersectionPoint,
          this.isDrawing
        );
      case SHAPES_INFO.CIRCLE:
        return this.circle.circleOnClick(
          this.intersectionPoint,
          ThreeSketcherClass.scene,
          this.isDrawing
        );
      case SHAPES_INFO.PENCIL:
        return this.pencil.pencilOnClick(
          ThreeSketcherClass.scene,
          this.points,
          this.intersectionPoint
        );
      case SHAPES_INFO.POLYLINE:
        this.polyLine.polyLineOnClick(
          ThreeSketcherClass.scene,
          this.intersectionPoint,
          this.isDrawing
        );
        break;
      case SHAPES_INFO.ELLIPSE:
        return this.ellipse.ellipseOnClick(ThreeSketcherClass.scene, this.intersectionPoint);
    }
  }

  onClick = () => {
    this.intersectionPoint = RaycasterUtils.handleClick(
      this.mouse,
      this.camera,
      this.plane.getMesh(),
      this.redDot,
      ThreeSketcherClass.scene,
      shapeStore.shape,
    );

    if (!this.intersectionPoint) return;
    if (shapeStore.shape === SHAPES_INFO.NULL) {
      return;
    }
    this.isDrawing = true;
    this.handleShapeCreation();
  };

  onResize = () => {
    const width = this.canvas.innerWidth;
    const height = this.canvas.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  updateRenderer = () => {
    this.renderer.render(ThreeSketcherClass.scene, this.camera);
    window.requestAnimationFrame(this.updateRenderer);
  };
  
}
