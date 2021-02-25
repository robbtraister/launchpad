function getRotation(pct) {
  return pct * 260 - 130;
}

// in seconds
const DURATION = 1;

export const Meter = ({
  value,
  total = 100,
  title,
  color = "#3a3",
  animated = true,
}: {
  value: number;
  total?: number;
  title?: string;
  color?: string;
  animated?: any;
}) => {
  const boundedTotal = Math.max(total, 1);
  const boundedValue = Math.max(Math.min(value, boundedTotal), 0);
  const pct = boundedValue / boundedTotal;

  const stepDuration = boundedValue > 0 ? DURATION / boundedValue : 0;

  const animatedText = animated === true || animated === "text";
  const animatedTick = animated === true || animated === "tick";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-125 -125 250 235">
      {/* gauge */}
      <g transform="rotate(-45)" fill="none" strokeWidth="20">
        {/* good bar */}
        <path
          d="M-100 0A100 100 0 0 1 0 -100"
          stroke="#f80"
          clipPath="inset(-100% 3px -100% -100%)"
        />
        {/* ok bar */}
        <path
          d="M0 -100A100 100 0 0 1 100 0"
          stroke="#ff0"
          clipPath="inset(-100% -100% 3px 3px)"
        />
        {/* bad bar */}
        <path
          d="M100 0A100 100 0 0 1 0 100"
          stroke="#0c0"
          clipPath="inset(3px -100% -100% -100%)"
        />
      </g>

      <g style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
        {/* text */}
        <g textAnchor="middle">
          {/* values */}
          <g fontSize="72" transform="translate(0,-5)">
            {animatedText &&
              [...new Array(value)].map((_, idx) => (
                <text display="none" key={idx}>
                  {idx}
                  <set
                    attributeName="display"
                    to="block"
                    dur={`${stepDuration.toFixed(3)}s`}
                    begin={`${(idx * stepDuration).toFixed(3)}s`}
                  />
                </text>
              ))}
            <text>
              {value}
              {animatedText && (
                <set
                  attributeName="display"
                  to="none"
                  dur={`${DURATION}s`}
                  begin="0s"
                />
              )}
            </text>
          </g>
          <text y="25" fontSize="18">
            out of
            <set attributeName="textContent" to="abc" dur="5s" begin="3s" />
          </text>
          <text y="55" fontSize="36">
            {total}
          </text>
        </g>
        {/* flag */}
        {title && (
          <g transform="translate(0 65)" strokeWidth="2">
            {/* duplicate borders for simple opacity */}
            <g fill={color} stroke={color}>
              <path d="M-100 -8h40v30h-40l10 -15z" />
              <path d="M100 -8h-40v30h40l-10 -15z" />
            </g>
            <g fill="none" stroke="#fff" opacity="0.75">
              <path d="M-100 -8h40v30h-40l10 -15z" />
              <path d="M100 -8h-40v30h40l-10 -15z" />
            </g>
            <path d="M-80 0v30h160v-30z" fill={color} stroke={color} />
            <path
              d="M-80 0v30h160v-30z"
              fill="none"
              stroke="#fff"
              opacity="0.75"
            />
            <text
              x="0"
              y="20"
              textAnchor="middle"
              fill="#fff"
              style={{ textTransform: "uppercase" }}
            >
              {title}
            </text>
          </g>
        )}
      </g>
      {/* tick */}
      <path
        d="M0 -100l-10 -20h20z"
        stroke="#eee"
        strokeWidth="2"
        fill="#444"
        transform={`rotate(${getRotation(pct)})`}
      >
        {animatedTick && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values={`-135 0 0;${getRotation(pct)} 0 0;${getRotation(
              0.85 * pct
            )} 0 0;${getRotation(pct)} 0 0;${getRotation(
              0.95 * pct
            )} 0 0;${getRotation(pct)} 0 0;${getRotation(
              0.98 * pct
            )} 0 0;${getRotation(pct)} 0 0`}
            keyTimes="0;0.4;0.6;0.8;0.87;0.94;0.96;1"
            calcMode="spline"
            keySplines="0.5 0 1 0.5;0 0.5 0.5 1;0.5 0 1 0.5;0 0.5 0.5 1;0.5 0 1 0.5;0 0.5 0.5 1;0.5 0 1 0.5"
            dur={`${DURATION}s`}
          />
        )}
      </path>
    </svg>
  );
};

export default Meter;
