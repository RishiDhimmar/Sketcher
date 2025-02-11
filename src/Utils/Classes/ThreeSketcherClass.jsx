import * as THREE from "three";
import Plane from "./Plane";
import RedDot from "./RedDot";
import { RaycasterUtils } from "./RaycasterUtils";
import { LineClass } from "./LineClass";
import { CircleClass } from "./CircleClass";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { PencilClass } from "./PencilClass";
import { PolyLineClass } from "./PolyLine";
import { EllipseClass } from "./EllipseClass";

export class ThreeSketcherClass {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.plane = new Plane();
    this.scene.add(this.plane.getMesh());
    this.redDot = new RedDot();
    this.mouse = { moux: null, mouy: null };
    this.isDrawing = false;
    this.state = "polyLine";

    this.circle = new CircleClass();
    this.pencil = new PencilClass();
    this.polyLine = new PolyLineClass();
    this.ellipse= new EllipseClass()

    this.line = new LineClass(); // Initializing LineClass instance
    this.points = []; // Store points for line
    this.intersectionPoint = null;

    this.setupCamera();
    this.setupRenderer();
    this.addEventListeners();
    this.updateRenderer();
    this.setUpAxisHelpers();
    // this.setUpControls()

    // this.controls = new OrbitControls(this.camera, this.canvas);
  }

  setUpAxisHelpers() {
    const axesHelper = new THREE.AxesHelper(100);
    axesHelper.position.set(0, 0, 0);
    this.scene.add(axesHelper);
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
    this.scene.add(this.camera);
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

    this.isDrawing = false;
    this.polyLine.stopDrawing(this.scene)
  };

  
  setUpControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
  }

  onMouseMove = (event) => {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.mouse = { moux: mouseX, mouy: mouseY };

    if (this.isDrawing && this.intersectionPoint) {
      const mouseVector = new THREE.Vector2(this.mouse.moux, this.mouse.mouy);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseVector, this.camera);

      const intersects = raycaster.intersectObject(this.plane.getMesh());
      // console.log("here");

      if (intersects.length > 0) {
        const newIntersection = intersects[0].point;

        switch (this.state) {
          case "line":
            this.line.lineMouseMove(
              this.scene,
              this.intersectionPoint,
              newIntersection
            );
            break;
          case "circle":
            this.circle.circleOnMouseMove(
              this.intersectionPoint,
              newIntersection,
              this.scene
            );
            break;
          case "pencil":
            this.pencil.pencilMouseMove(
              this.scene,
              this.intersectionPoint,
              newIntersection
            );
            break;
          case "polyLine":
            this.polyLine.polyLineMouseMove(
              this.scene,
              this.intersectionPoint,
              newIntersection
            );
            break;
          case "ellipse":
            this.ellipse.ellipseOnMouseMove(
              this.scene,
              this.intersectionPoint,
              newIntersection
            );
            break;
        }
      }
    }
  };

  onClick = () => {
    this.intersectionPoint = RaycasterUtils.handleClick(
      this.mouse,
      this.camera,
      this.plane.getMesh(),
      this.redDot,
      this.scene
    );

    if (this.intersectionPoint) {
      this.isDrawing = true;

      switch (this.state) {
        case "line":
          console.log("line");
          this.line.lineOnClick(
            this.scene,
            this.points,
            this.intersectionPoint,
            this.isDrawing
          );
          this.points = [];
          // this.isDrawing = false;
          break;
        case "circle":
          if (!this.intersectionPoint) {
            this.circle = new CircleClass();
            console.log("new Circle created");
          }
          if (
            this.circle.circleOnClick(
              this.intersectionPoint,
              this.scene,
              this.isDrawing
            )
          ) {
            this.isDrawing = false;
          }
          break;
        case "pencil":
          if (!this.intersectionPoint) {
            this.pencil = new PencilClass();
            console.log("new Pencil created");
          }
          if (
            this.pencil.pencilOnClick(
              this.scene,
              this.points,
              this.intersectionPoint
            )
          ) {
            // this.points = [];
            this.intersectionPoint = null;
            this.isDrawing = false;
          }
          break;
        case "polyLine":
          if (!this.intersectionPoint) {
            this.polyLine = new PolyLineClass();
            console.log("new Polyline created");
          }

          this.polyLine.polyLineOnClick(
            this.scene,
            this.intersectionPoint,
            this.isDrawing
          );
          break;
        case "ellipse":
          if (!this.intersectionPoint) {
            this.ellipse = new EllipseClass();
            console.log("new Polyline created");
          }

          this.ellipse.ellipseOnClick(
            this.scene,
            this.intersectionPoint,
          );
          break;
      }
    }
  };

  onResize = () => {
    const width = this.canvas.innerWidth;
    const height = this.canvas.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  updateRenderer = () => {
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.updateRenderer);
  };
}
