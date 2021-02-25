"use strict";

import PropTypes from "prop-types";
import React from "react";
import { useStore } from "../../../contexts/store";

const Transaction = ({ amount, label }) => (
  <li>{`${label}: ${amount.toFixed(2)}`}</li>
);

Transaction.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

const Transactions = ({ account }) => {
  const { transactions } = useStore();
  return (
    <ul>
      {transactions
        .filter((datum) => !account || datum.account === account)
        .map((datum) => (
          <Transaction key={datum.label} {...datum} />
        ))}
    </ul>
  );
};

Transactions.propTypes = {
  account: PropTypes.string,
};

export default Transactions;
