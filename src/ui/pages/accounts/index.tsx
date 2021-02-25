"use strict";

import React from "react";
import {
  NavLink,
  NavLinkProps,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";

import { useStore } from "../../contexts/store";
import Scene from "../../components/page";
import Transactions from "../../components/consumers/transactions";
import Widget from "../../components/widget";
import styles from "./styles.scss";

const AccountTab = ({ children, ...props }: NavLinkProps) => (
  <li>
    <NavLink {...props} exact>
      {children}
    </NavLink>
  </li>
);

const Accounts = ({
  match,
  history,
  location,
}: RouteComponentProps<{ id: string }>) => {
  const { accounts } = useStore();
  const id = match.params.id;

  if (!id) {
    const queryId = new URLSearchParams(location.search).get("id");
    if (queryId) {
      return <Redirect to={`/accounts/${queryId}`} />;
    }
  }

  if (id && !accounts.find((account) => account.id === id)) {
    return <Redirect to="/accounts" />;
  }

  function change(e) {
    history.push(`/accounts/${e.target.value || ""}`);
  }

  return (
    <Scene title="Accounts">
      <div style={{ display: "grid" }}>
        <Widget>
          <div className={styles.grid}>
            <div className={`${styles.accounts} ${styles.list}`}>
              <ul>
                <AccountTab to="/accounts">All Accounts</AccountTab>
                {accounts.map((account) => (
                  <AccountTab to={`/accounts/${account.id}`} key={account.id}>
                    {account.label}
                  </AccountTab>
                ))}
              </ul>
            </div>
            <div className={`${styles.accounts} ${styles.select}`}>
              <form method="GET" action="/accounts">
                <select name="id" value={id} onChange={change}>
                  <option value="">All Accounts</option>
                  {accounts.map((account) => (
                    <option value={account.id} key={account.id}>
                      {account.label}
                    </option>
                  ))}
                </select>
                <noscript>
                  <input type="submit" value="Go" />
                </noscript>
              </form>
            </div>
            <div>
              <h3 className={styles.title}>
                {id ? `account ${id}` : "All Accounts"}
              </h3>
              <Transactions account={id} />
            </div>
          </div>
        </Widget>
      </div>
    </Scene>
  );
};

export { Accounts };
