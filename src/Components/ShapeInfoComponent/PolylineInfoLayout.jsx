/* eslint-disable react/prop-types */
// import React from 'react'

import PointInput from "../HelperComponents/PointInput";

function PolylineInfoLayout({ points }) {
  return (
    <>
      <div className="position">
        {points?.map((point, index) => {
          return (
            <>
              {index < points.length - 2 && (
                <>
                  {" "}
                  <div className="label my-2 bold-roboto">Point {index}</div>
                  <PointInput value={point} key={index} />
                </>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}

export default PolylineInfoLayout;
