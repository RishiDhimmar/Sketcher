// // eslint-disable-next-line react/prop-types
// const ShapeSelector = ({ icon, label, active, onClick }) => {
//   return (
//     <div
//       className={`shape-wrap flex flex-col justify-center items-center p-2 rounded-lg cursor-pointer transition-colors duration-100 ${
//         active ? 'bg-blue-400 text-white' : ''
//       }`}
//       onClick={onClick}
//     >
//       <div className={`icon-con mb-2 w-[16px] h-[16px]`}>
//         {icon}
//       </div>
//       <div className="font-poppins bold-poppins text-[14px]">
//         {label}
//       </div>
//     </div>
//   );
// };

// export default ShapeSelector;
// eslint-disable-next-line react/prop-types
// eslint-disable-next-line react/prop-types
const ShapeSelector = ({ icon, label, active, onClick }) => {
  return (
    <div
      className={`shape-wrap flex flex-col justify-center items-center p-2 rounded-lg cursor-pointer transition-colors duration-100 ${
        active ? 'bg-blue-400 text-white' : 'text-gray-800'
      }`}
      onClick={onClick}
      style={{
        '--icon-color': active ? 'white' : 'inherit',
      }}
    >
      <div className={`icon-con mb-2 w-[16px] h-[16px]`} style={{ color: 'var(--icon-color)' }}>
        {icon}
      </div>
      <div className="font-poppins bold-poppins text-[14px]">
        {label}
      </div>
    </div>
  );
};

export default ShapeSelector;