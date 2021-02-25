"use strict";

import React from "react";

import Scene from "../../components/page";
import Widget from "../../components/widget";

const Profile = () => (
  <Scene title="Profile">
    <Widget>
      <a href="/logout">logout</a>
    </Widget>
  </Scene>
);

export { Profile };
