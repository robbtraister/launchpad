import { useState } from "react";

const Counter = ({ right }: { right: boolean }) => {
  const [count, setCount] = useState(0);

  const inc = () => setCount((val) => val + 1);

  return (
    <div style={{ textAlign: right ? "right" : "left" }}>
      <button onClick={inc}>inc</button>: {count}
    </div>
  );
};

export default Counter;
