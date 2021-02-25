import styles from "./styles.scss";

export const Body = ({ children }: { children?: React.ReactNode }) => (
  <div className={styles.body}>
    <div className={styles.container}>{children}</div>
  </div>
);

export default Body;
