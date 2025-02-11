const SecondaryOutlinedButton =({ text, icon }) => {
  return (
    <button
      type="button"
      className={`py-4 my-2 w-full rounded text-md font-poppins border border-[#00000026] cursor-pointer  hover:bg-white focus:outline-none `}
      
    >
      <div className="wrap flex justify-center gap-3 align-items-center">
        <span className="mt-1 w-[20px]">{icon}</span>
        <span className="font-roboto normal-roboto text-[16px]">
          {text}  </span>
      </div>
    </button>
  );
}

export default SecondaryOutlinedButton;
