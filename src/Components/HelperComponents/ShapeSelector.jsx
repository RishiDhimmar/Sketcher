// eslint-disable-next-line react/prop-types
const ShapeSelector = ({ icon, label, active, onClick }) => {
  return (
    <div
      className={`shape-wrap flex flex-col justify-center items-center p-2 rounded-lg cursor-pointer transition-colors  ${active ? 'bg-blue-400 text-white' : ''}`}
      onClick={onClick}
    >
      <div className={`icon-con mb-2 w-[16px] h-[16px] transition-colors duration-100`}>
        {icon}
      </div>
      <div className="font-poppins bold-poppins text-[14px] transition-colors duration-100">
        {label}
      </div>
    </div>
  );
};

export default ShapeSelector;
