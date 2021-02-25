"use strict";

import PropTypes from "prop-types";
import React from "react";

const DURATION = 1;

const Pie = ({ data }) => {
  const total = data.reduce((sum, datum) => sum + datum.value, 0);
  let inc = 0;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-125 -125 250 250">
      <defs>
        <clipPath id="fan">
          <polygon>
            <animate
              attributeName="points"
              begin="0"
              dur={`${DURATION}s`}
              fill="freeze"
              values="0,0, -100,0, -100,0, -100,0, -100,0, -100,0, -100,0; 0,0, -100,0, -100,-100, -100,-100, -100,-100, -100,-100, -100,-100; 0,0, -100,0, -100,-100, 100,-100, 100,-100, 100,-100, 100,-100; 0,0, -100,0, -100,-100, 100,-100, 100,100, 100,100, 100,100; 0,0, -100,0, -100,-100, 100,-100, 100,100, -100,100, -100,100; 0,0, -100,0, -100,-100, 100,-100, 100,100, -100,100, -100,0"
              keyTimes="0;0.125;0.375;0.625;.875;1"
            />
          </polygon>
        </clipPath>
      </defs>
      <g clipPath="url(#fan)">
        {data.map((datum, idx) => {
          const thisRotation = inc;
          inc += datum.value;
          return (
            <g
              key={idx}
              transform={`rotate(${180 + (thisRotation / total) * 360})`}
            >
              <circle
                cx="0"
                cy="0"
                r="50"
                strokeWidth="100"
                strokeDasharray={`${
                  (100 * Math.PI * datum.value) / total
                } 5000`}
                stroke={datum.color}
                fill="none"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

Pie.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Pie;
