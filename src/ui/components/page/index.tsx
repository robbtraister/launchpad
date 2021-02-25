import { useEffect } from "react";

import Title from "../title";
import Widget from "../widget";

export const Page = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Widget>
        <Title>{title}</Title>
      </Widget>
      {children}
    </>
  );
};

export default Page;
