import { Goals } from "ui/components/goals";
import { Page } from "ui/components/page";
import { Retirement } from "ui/components/retirement";
import { Widget } from "ui/components/widget";

import styles from "./styles.scss";

export const Guidance = () => {
  return (
    <Page title="Guidance">
      <div className={styles.grid}>
        <Widget>
          <Retirement />
        </Widget>
        <Widget>
          <Goals />
        </Widget>
        <Widget>
          <Goals />
        </Widget>
      </div>
    </Page>
  );
};

export default Guidance;
