
const PositionInput = ({label , sub }) => {
  return (
    <div className="flex items-center rounded-md bg-gray-100 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 font-poppins p-1 my-3 ">
      <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 ">
      <span>{label}</span>
      <span>{sub ? sub : ""}</span> :
      </div>
      <input
        id="xCord"
        name="x"
        type="number"
        placeholder="0.0000"
        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
      />
    </div>
  );
}

export default PositionInput;
