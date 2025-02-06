import ShapeTree from "./ShapeTree";
import Center from "./Center";
import ShapeInfo from "./ShapeInfo";

function App() {
  return (
    <>
    <div className="container-fluid h-full relative m-0 p-0">

      {/* <div className="flex gap-3 "> */}
        <div className="left bg-[#f4f4f4] w-[350px] px-5 py-4 rounded-lg m-1 absolute top-0 left-0 pb-3"><ShapeTree /></div>
        <div className="center text-center w-full p-2 rounded m-1 absolute"><Center /></div>
        <div className="right bg-[#f4f4f4] w-[400px] p-5 rounded m-1 absolute top-0 right-0"><ShapeInfo /></div>
      {/* </div> */}
      <canvas className=" bg-blue-200 w-full h-full flex webgl"></canvas>

    </div>
    </>
  );
}

export default App;
