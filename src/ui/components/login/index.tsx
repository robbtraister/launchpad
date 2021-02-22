import clsx from "clsx";

import layout from "ui/styles/layout.scss";

import styles from "./index.scss";

const PATH_PREFIX = process.env.PATH_PREFIX;

export function Login() {
  return (
    <div
      className={clsx(
        layout.column,
        layout.fill,
        layout.centeredContent,
        styles.login
      )}
    >
      <div className={clsx(styles.loginCard)}>
        <a className={clsx(styles.loginButton)} href={`${PATH_PREFIX}/`}>
          Login
        </a>
      </div>
    </div>
  );
}
