import { useState } from "react";
import { v4 } from "uuid";

export const Input = ({ label, ...props }: { label: string }) => {
  const [id] = useState(v4);
  return (
    <>
      <input {...props} id={id} />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default Input;
