const SecondaryOutlinedButton =({ text, icon }) => {
  return (
    <button
      type="button"
      className={`py-4 my-3 w-full rounded text-gray-500 text-md font-poppins border border-gray-500 cursor-pointer  hover:bg-white focus:outline-none `}
    >
      <div className="wrap flex justify-center gap-3 align-items-center">
        <span className="mt-1">{icon}</span>
        {text}
      </div>
    </button>
  );
}

export default SecondaryOutlinedButton;
