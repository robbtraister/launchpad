"use strict";

import PropTypes from "prop-types";
import React from "react";

import Meter from "../../components/meter";
import Scene from "../../components/page";
import Widget from "../../components/widget";
import { useStore } from "../../contexts/store";
import styles from "./styles.scss";

const Entry = ({ value, total, title, description }) => (
  <Widget className={styles.entry}>
    <div className={styles.meter}>
      <Meter value={value} total={total} />
    </div>
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  </Widget>
);

Entry.propTypes = {
  value: PropTypes.number.isRequired,
  total: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

const Score = () => {
  const { score } = useStore();
  return (
    <Scene title="Score">
      <div className={styles.grid}>
        <Widget className={styles.total}>
          <div className={styles.title}>Your Score</div>
          <Meter value={score.value} title="Wellness Score" />
          <div className={styles.description}>
            <div className={styles.title}>Get the Complete Picture</div>
            <div>
              Add your savings, checking, credit card, loan, investment, 401(k),
              IRA, and other bank accounts so we can score you accurately
            </div>
            <div className={styles.peer}>
              <div className={styles.title}>Your Peers</div>
              <Meter value={score.peer} title="Wellness Score" color="#808" />
            </div>
          </div>
        </Widget>
        {score.entries.map((entry) => (
          <Entry {...entry} key={entry.title} />
        ))}
      </div>
    </Scene>
  );
};

export { Score };
