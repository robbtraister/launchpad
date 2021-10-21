import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { Pages } from "./pages";

import "./index.scss";

// if sent here from the 404 page, update the history URI
const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");
if (redirect) {
  history.replaceState(null, "", redirect);
}

window.document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <StrictMode>
      <Pages />
    </StrictMode>,
    document.getElementById("root")
  );
});
