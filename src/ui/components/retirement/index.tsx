import Graph from "ui/components/presentational/graph";
import { useStore } from "ui/contexts/store";

export const Retirement = () => {
  const { retirement } = useStore();

  return <Graph data={retirement} />;
};

export default Retirement;
