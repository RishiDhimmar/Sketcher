import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const PositionInput = ({ label, sub, value, onChange }) => {
  const [ipValue, setValue] = useState();
  useEffect(() => {
    setValue(parseFloat(parseFloat(value).toFixed(5)));
  }, [value]);
  const handleChange = (e) => {
    const newValue = parseFloat(parseFloat(e.target.value).toFixed(5));
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 font-poppins p-[8px] my-3 ">
      <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
        <span>{label}</span>
        <span>{sub && ` ${sub}`}</span>:
      </div>
      <input
        id="xCord"
        name="x"
        type="number"
        step="0.00001"
        placeholder="0.0000"
        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        value={ipValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default PositionInput;
