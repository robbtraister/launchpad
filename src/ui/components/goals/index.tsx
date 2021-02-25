import Input from "ui/components/input";
import { useStore } from "ui/contexts/store";

import styles from "./styles.scss";

const ToggleButton = ({
  initialMode,
  value,
}: {
  initialMode: string;
  value: string;
}) => (
  <Input
    label={value}
    type="radio"
    name="mode"
    value={value}
    defaultChecked={initialMode === value}
  />
);

export const Goals = ({ initialMode = "both" }) => {
  const { goals } = useStore();

  return (
    <form style={{ textAlign: "center" }}>
      <ToggleButton initialMode={initialMode} value="savings" />
      <ToggleButton initialMode={initialMode} value="both" />
      <ToggleButton initialMode={initialMode} value="debt" />

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -205 325 225">
        <defs>
          <linearGradient
            id="savingsGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {goals.savings.map((datum, idx) => (
              <stop
                key={idx}
                offset={`${datum[0] / 3}%`}
                style={{
                  stopColor: "rgb(0,255,255)",
                  stopOpacity: datum[1] / 150,
                }}
              />
            ))}
          </linearGradient>
          <linearGradient id="debtGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {goals.debt.map((datum, idx) => (
              <stop
                key={idx}
                offset={`${datum[0] / 3}%`}
                style={{
                  stopColor: "rgb(255,0,255)",
                  stopOpacity: -datum[1] / 120,
                }}
              />
            ))}
          </linearGradient>
        </defs>
        <g clipPath="inset(0)">
          <g
            className={`${styles.grid}`}
            style={{ transform: "translate(0,-100px) scaleY(0.5)" }}
          >
            <g transform="scale(1 0)">
              <g
                fill="url(#savingsGradient)"
                strokeWidth="0"
                className={styles.savings}
              >
                <g className={styles.area}>
                  <path
                    d={`M0,0${goals.savings
                      .map((datum) => `L${datum[0]},${-datum[1]}`)
                      .join("")}L300,0z`}
                  />
                </g>
                <g className={styles.line}>
                  <path d="M0,0v-10h300v10z" />
                </g>
              </g>
              <g
                fill="url(#debtGradient)"
                strokeWidth="0"
                className={styles.debt}
              >
                <g className={styles.area}>
                  <path
                    d={`M0,0${goals.debt
                      .map((datum) => `L${datum[0]},${-datum[1]}`)
                      .join("")}L300,0z`}
                  />
                </g>
                <g className={styles.line}>
                  <path d="M0,0v10h300v-10z" />
                </g>
              </g>
              <animateTransform
                attributeName="transform"
                type="scale"
                from="1 0"
                to="1 1"
                begin="0s"
                dur="1s"
                fill="freeze"
              />
            </g>
          </g>
          <path
            d="M0,0h300v-200h-300z"
            strokeWidth="2"
            stroke="#555"
            fill="none"
          />
        </g>
      </svg>
    </form>
  );
};

export default Goals;
