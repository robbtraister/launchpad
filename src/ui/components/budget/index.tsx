import Pie from "ui/components/presentational/pie";
import { useStore } from "ui/contexts/store";

export const Budget = () => {
  const { budget } = useStore();

  return <Pie data={budget} />;
};

export default Budget;
