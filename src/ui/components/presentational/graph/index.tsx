"use strict";

import PropTypes from "prop-types";
import React, { createRef, useEffect, useState } from "react";

function pToX(px) {
  return 3 * px;
}

function xToP(x) {
  return x / 3;
}

function pToY(py) {
  return -2 * py;
}

function yToP(y) {
  return y / -2;
}

function offsetToX(v, svg) {
  return (
    (v / svg.clientWidth) * svg.viewBox.animVal.width + svg.viewBox.animVal.x
  );
}

function offsetToY(v, svg) {
  return (
    (v / svg.clientHeight) * svg.viewBox.animVal.height + svg.viewBox.animVal.y
  );
}

const Graph = ({ data, xLabel = "time", yLabel = "money" }) => {
  const svg: React.Ref<SVGSVGElement> = createRef();

  const [hover, setHover] = useState(null);

  useEffect(() => {
    const target = svg.current;
    if (target) {
      const moveHandler = (e) => {
        const x = offsetToX(e.offsetX, target);
        const px = xToP(x);
        const py = yToP(offsetToY(e.offsetY, target));
        if (px >= 0 && px <= 100 && py >= 0 && py <= 100) {
          let py = 0;
          for (let index = 1; index < data.length; index++) {
            if (data[index][0] >= px) {
              py =
                data[index - 1][1] +
                ((px - data[index - 1][0]) /
                  (data[index][0] - data[index - 1][0])) *
                  (data[index][1] - data[index - 1][1]);
              break;
            }
          }
          setHover({
            x,
            y: pToY(py),
            label: `$${py.toFixed(2)}`,
            textAnchor: px >= 50 ? "end" : "start",
            alignmentBaseline: "text-after-edge",
          });
        } else {
          setHover(null);
        }
      };
      const leaveHandler = () => {
        setHover(null);
      };
      target.addEventListener("mousemove", moveHandler);
      target.addEventListener("mouseleave", leaveHandler);

      return () => {
        target.removeEventListener("mousemove", moveHandler);
        target.removeEventListener("mouseleave", leaveHandler);
      };
    }
  }, [svg.current]);

  const line = data.map(([px, py]) => `${pToX(px)},${pToY(py)}`).join("L");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-20 -205 325 225"
      ref={svg}
    >
      <g clipPath="inset(0)">
        <g>
          <path
            d={`M${pToX(100)},${pToY(0)}h-${pToX(100)}L${line}z`}
            fill="#cfc"
          />
          <path d={`M${line}`} stroke="#080" strokeWidth="2" fill="none" />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1 0 ; 1 1"
            keyTimes="0 ; 1"
            calcMode="spline"
            keySplines="0.5 0 0.5 1"
            dur="1s"
          />
          {hover && (
            <circle
              cx={hover.x}
              cy={hover.y}
              r="3"
              stroke="#444"
              strokeWidth="1"
              fill="none"
            />
          )}
          {hover && (
            <text
              x={hover.x}
              y={hover.y}
              textAnchor={hover.textAnchor}
              alignmentBaseline={hover.alignmentBaseline}
            >
              {hover.label}
            </text>
          )}
        </g>
        {hover && (
          <path
            d={`M${hover.x},${pToY(0)}v${pToY(100)}`}
            stroke="#444"
            strokeWidth="1"
            fill="none"
          />
        )}
        <path
          d={`M${pToX(0)},${pToY(0)}h${pToX(100)}v${pToY(100)}h-${pToX(100)}z`}
          strokeWidth="2"
          stroke="#333"
          fill="none"
        />
      </g>
      <g x="0" y="0" fontSize="18">
        <text textAnchor="middle" transform="translate(150 18)">
          {xLabel}
        </text>
        <text textAnchor="middle" transform="rotate(-90) translate(100 -5)">
          {yLabel}
        </text>
      </g>
    </svg>
  );
};

Graph.propTypes = {
  data: PropTypes.array.isRequired,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

export default Graph;
