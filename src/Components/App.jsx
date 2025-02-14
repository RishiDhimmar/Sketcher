import ShapeTree from "./TreeComponent/ShapeTree";
import Center from "./CenterComponent/Center";
import ShapeInfo from "./ShapeInfoComponent/ShapeInfo";
import "../Utils/main";
import { useEffect, useRef } from "react";
import {ThreeSketcherClass} from "../Utils/Classes/ThreeSketcherClass"



const App = () => {

  const canvasRef = useRef(null)

  useEffect(() => {
    if(canvasRef.current){
      const threeSketcher = new ThreeSketcherClass(canvasRef.current);
      threeSketcher.updateRenderer();
    }
    else {
      console.log("not working")
    }
  })
  
  

  return (
    <>
      <div className="container-fluid h-full relative m-0 p-0">
        <div className="flex gap-3 ">
        <div className="left classic-background w-[330px] px-5 py-4 rounded-lg m-1 border border-1 border-[#0000000D] pb-5 absolute top-0 left-0 pb-3 mt-4">
          <ShapeTree />
        </div>
        <div className="center text-center w-full p-2 rounded m-1 absolute">
          <Center />
        </div>
        <div className="right classic-background w-[400px] mt-4 rounded m-1 absolute top-0 right-0 flex items-center justify-center rounded-lg ">
          <ShapeInfo />
        </div>
        </div>
        <canvas className="webgl" ref={canvasRef}></canvas>
      </div>
    </>
  );
};

export default App;
