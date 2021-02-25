"use strict";

import React from "react";

import BudgetComponent from "../../components/budget";
import Scene from "../../components/page";
import Widget from "../../components/widget";

const Budget = () => (
  <Scene title="Budget">
    <Widget>
      <div style={{ margin: "0 auto", width: "50%" }}>
        <BudgetComponent />
      </div>
    </Widget>
  </Scene>
);

export { Budget };
