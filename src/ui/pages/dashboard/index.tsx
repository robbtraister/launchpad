import { Budget } from "ui/components/budget";
// import Counter from "ui/components/counter";
import { Goals } from "ui/components/goals";
import { Retirement } from "ui/components/retirement";
import { Meter } from "ui/components/meter";
// import Transactions from "ui/components/consumers/transactions";
import { Page } from "ui/components/page";
import { Widget } from "ui/components/widget";

import styles from "./styles.scss";

export const Dashboard = () => (
  <Page title="Home">
    <div className={styles.grid}>
      <Widget>
        <div className={styles.score}>
          <div className={styles.title}>Your Score</div>
          <Meter value={85} title="Wellness Score" />
        </div>
        <div className={styles.score}>
          <div className={`${styles.title} ${styles.peer}`}>Your Peers</div>
          <Meter value={92} title="Wellness Score" color="#808" />
        </div>
      </Widget>
      {/* <Widget>
        <Retirement />
      </Widget> */}
      {/* <Widget>
        <Budget />
      </Widget> */}
      {/* <Widget>
        <Goals />
      </Widget> */}
      {/* <Widget>
        <Counter right />
        <div style={{ height: "200px" }} />
      </Widget>
      <Widget>
        <h3 className={styles.title}>All Accounts</h3>
        <Transactions />
      </Widget>
      <Widget>
        data
        <div style={{ height: "200px" }} />
      </Widget>
      <Widget>
        scroll
        <div style={{ height: "400px" }} />
      </Widget> */}
    </div>
  </Page>
);

export default Dashboard;
